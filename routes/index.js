var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Julien Noel Portfolio' });
});

router.post('/contact', async function(req, res, next) {

  
  const receiver = 'contact@julien-noel.com'
  const nom = req.body.name
  const mail = req.body.email
  const message = `${req.body.message} \n ${nom} \n ${mail}`
  

  let transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: receiver, // generated ethereal user
      pass: 'J48rdlv94.', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let info = await transporter.sendMail({
    from: mail, // sender address
    to: receiver, // list of receivers
    subject: `Prise de contact ${nom}`, // Subject line
    text: message, // plain text body
    
  });

  console.log("Message sent: %s", info.messageId)
  


  res.render('index',{ title: 'message envoyé' });
});

module.exports = router;
