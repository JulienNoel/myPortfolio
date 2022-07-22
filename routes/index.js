var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
var userModel = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Julien Noel Portfolio' });
});

router.post('/contact', async function(req, res, next) {

  
  const receiver = 'contact@julien-noel.com'
  const nom = req.body.name
  const mail = req.body.email
  const message = req.body.message
  const tel = req.body.tel

  const user = await userModel.findOne({
    mail: mail,
  });  
  
  if (user) {
    user.userMessage.push({message: message})
    await user.save()
  }else {
    const newUser = new userModel({
      userName: nom,
      mail: mail,
      tel: tel, 
      userMessage: [{message: message,}]
    });
    
   await newUser.save();
  }
  

  const outpout =  `
                    <h3>Coordonnées Contact</h3>
                    <ul>
                    <li>Nom: ${nom}</li>
                    <li>Email : ${mail}</li>
                    <li>Tel : ${tel}</li>                                       
                    </ul>
                    <h3>Message : </h3>
                    <p>${message}<p/>
                    `
  

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
    html: outpout
  });

  console.log("Message sent: %s", info.messageId)
  


  res.redirect('/');
});

module.exports = router;
