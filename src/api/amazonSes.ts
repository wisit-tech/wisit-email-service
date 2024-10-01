import aws from 'aws-sdk';

export const sendEmailUsingSes = async (reqParams: { mailId: string; message: string; subject: string }) => {
    console.log(reqParams);
    const { mailId, message, subject } = reqParams;

    // Validate the email address format
    if (!mailId || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(mailId)) {
        return;
    }

    // Initialize AWS SES
    const ses = new aws.SES({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    // Define the email parameters
    const params = {
        Destination: {
            ToAddresses: [mailId],
        },
        Message: {
            Body: {
                Text: {
                    Data: message, // Use the message parameter as the email body
                    Charset: 'UTF-8',
                },
            },
            Subject: {
                Data: subject,
                Charset: 'UTF-8',
            },
        },
        Source: "wisit-tech@wisit.in",
    };

    // Send the email
    try {
        const data = await ses.sendEmail(params).promise();
        console.log('Email sent successfully:', data.MessageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
