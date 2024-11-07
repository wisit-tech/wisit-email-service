import aws from 'aws-sdk';
import { isValidEmail } from '../utils/validators';
import { EMAIL_SOURCE } from '../utils/constants';
import { config } from '../utils/config';

export const sendEmailUsingSes = async (reqParams: {
  mailId: string;
  message: string;
  subject: string;
}) => {
  const { mailId, message, subject } = reqParams;

  // Use validator utility for email validation
  if (!isValidEmail(mailId)) {
    throw new Error('Invalid email format');
  }

  // Initialize AWS SES
  const ses = new aws.SES({
    region: config.aws.region,
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  });

  // Define email parameters
  const params = {
    Destination: { ToAddresses: [mailId] },
    Message: {
      Body: {
        Html: { Data: message, Charset: 'UTF-8' },
        Text: { Data: message, Charset: 'UTF-8' },
      },
      Subject: { Data: subject, Charset: 'UTF-8' },
    },
    Source: EMAIL_SOURCE,
  };

  try {
    const data = await ses.sendEmail(params).promise();
    console.log('Email sent successfully:', data.MessageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
