import nodemailer from 'nodemailer';

export const mailHotel=(params:any)=>{
  console.log(params)
if(!params.mailId || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(params.mailId) ){
  return;
} 
  // console.log(params)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    
    var mailOptions = {
      from: process.env.EMAIL,
      to: params.mailId,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, (error: any, info: { response: string; })=>{
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
};