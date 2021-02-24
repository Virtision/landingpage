const router = require('express').Router();
const mailer = require('./../mailer') // Mailer implementation by Ciunkos

router.post('/', (req, res) => {
  const { email = '', name = '', text = '', phone = ''} = req.body

  mailer({ email, name, text, phone }).then(() => {
    console.log(`Sent message "${text}" from <${name}> ${email} (${phone}).`);
    res.redirect('/#success');
  }).catch((error) => {
    console.log(`Failed to send message "${text}" from <${name}> ${email} (${phone}).\n
    Error: ""${error && error.message}""`);
    res.redirect('/#error');
  })
});

module.exports = router;
