const nodemailer = require("nodemailer");
const {lecturerBaseURL} = require('../config/urlconfig')
const config = require('../config/lecturerconfig');


const sendEmail = async(email, activationcode, firstName) =>{

try{



   // https://ci4.googleusercontent.com/proxy/cmVA0MifZ9eSLVDmwBWzjNFTMrSxdmQ7JtZ-SE1fC_E8u-NMYYYWbr4X4aW66SqvGlVYY5gLo8I6V2OXk9p54WcF=s0-d-e1-ft#http://localhost:4000//public/images/mailbg.jpg
const theHtml = `
    <h3>SSAP Account Activation</h3>
   
    <h3>Welcome ${firstName} ,</h3>

    <p>Welcome To Student Self Assesment Platformv SSAP. You registered email id is ${email}</p>.

    <p>Kindly use the link below to activate your account</p>

    <a href="`+lecturerBaseURL+`/verify-lecturer/`+activationcode+`">Activate Account</button>
   
    `


     // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'edwinmydev@gmail.com', // generated ethereal user
      pass: 'rcloaxretofggtgg' // generated ethereal password
    }
  });
       // send mail with defined transport object
   let info = await transporter.sendMail({
    from: '"Student Self Assessment Platform" <edwinmydev@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "SSAP - Account Activation Code", // Subject line
    // text: "Hello world?", // plain text body
    html: theHtml // html body
  });

  var response ={
      status: 'SENT',
      info: info
  }
  return response;
}catch(err){
    console.log('email error=>',err)
    var response ={
        status: 'ERROR',
        error: err
    }
    return response;
}


}


module.exports = sendEmail
