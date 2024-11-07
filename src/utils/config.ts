export const config = {
    aws: {
      region: process.env.AWS_REGION || 'default-region',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
    email: {
      id: process.env.EMAIL_ID || '',
      password: process.env.PASSWORD || '',
    },
  };
  