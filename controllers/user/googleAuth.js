const queryString = require('query-string');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const { User } = require('../../model');
const jwt = require('jsonwebtoken');

const { GOOGLE_CLIENT_ID, BASE_URL, GOOGLE_CLIENT_SECRET, FRONTEND_URL, SECRET_KEY } = process.env;

exports.googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/api/users/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`);
};

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/users/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { id, name, email } = userData.data;
  const user = await User.findOne({ email });
  if (!user) {
    const hashPasword = bcrypt.hashSync(id, bcrypt.genSaltSync(10));
    const userGoogle = await User.create({
      token: null,
      email: email,
      name: name,
      password: hashPasword,
      verify: true,
      verifyToken: null,
    });
    const { _id } = userGoogle;
    const payload = {
      _id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(_id, { token });
    return res.redirect(`${FRONTEND_URL}/google-redirect/?access_token=${token}`);
  }
  const { _id } = user;
  const payload = {
    _id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });

  return res.redirect(`${FRONTEND_URL}/google-redirect/?access_token=${token}`);
};