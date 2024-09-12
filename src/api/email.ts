import nodemailer from 'nodemailer';

export const mailHotel=()=>{

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'suryu7240@gmail.com',
        pass: 'izrc gcec cqhg nhsm'
      }
    });
    
    var mailOptions = {
      from: 'suryu7240@gmail.com',
      to: 'omarsuryansh03@gmail.com',
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