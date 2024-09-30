import aws from 'aws-sdk';

export const sendEmailUsingSes = async (reqParams:any)=>{
    if(!reqParams.mailId || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(reqParams.mailId) ){
      return;
    }
    const ses = new aws.SES({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    })
    const params = {
        Destination: {
            ToAddresses: [reqParams.mailId],
        },
        Message: {
            Body: {
                Text: {
                    Data: 'This is a test email sent from Node.js using Amazon SES!',
                    Charset: 'UTF-8',
                },
            },
            Subject: {
                Data: 'Test Email',
                Charset: 'UTF-8',
            },
        },
        Source: process.env.EMAIL??'',
    };

    try {
        const data = await ses.sendEmail(params).promise();
        console.log('Email sent successfully:', data.MessageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};