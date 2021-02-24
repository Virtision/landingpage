const nodemailer = require('nodemailer')
const keys = require('../../config/keys')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: keys.user,
    clientId: keys.clientId,
    clientSecret: keys.clientSecret,
    refreshToken: keys.refreshToken,
    accessToken: keys.accessToken
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.on('token', token => {
    console.log('A new access token was generated');
    console.log('User: %s', token.user);
    console.log('Access Token: %s', token.accessToken);
    console.log('Expires: %s', new Date(token.expires));
});

const send = ({ email, name, text, phone }) => {
  console.log("Received:");
  console.log({ email, name, text, phone});
  const from = name && email ? `${name} <${email}>` : `${name || email}`
  const message = {
    from,
    to: keys.user,
    bcc: [keys.bcc1, keys.bcc2],
    subject: `New message from ${from} at Virtision`,
    text: text + ' (' + phone + ')'
  };
  console.log("Send:");
  console.log(message);

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}


module.exports = send;
