
const nodemailer=require('nodemailer');

exports.sendEmail=function(emails,output,tipoAsunto){

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'udeaipisis@gmail.com', 
        pass: 'ipisis123'  
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  
  let mailOptions = {
      from: '"Informe IPISIS" <udeaipisis@gmail.com>', // sender address
      to: emails, // list of receivers
      subject: tipoAsunto, // Subject line
      html: output // html body
  };

  
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      //res.render('contact', {msg:'Email has been sent'});
  });
}
