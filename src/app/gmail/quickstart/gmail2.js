const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

require("dotenv").config();

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;

const REDIRECT_URI = []; // Array of redirect_uri

const setupTransporter = async () => {
  // Creating OAuth Client
  const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI[0]);

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  // Generate access token using OAuth Client
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("error", err);
      }
      resolve(token);
    });
  });

  // Create a transporter object
  const nodeTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL_ADDRESS,
      accessToken,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    },
  });

  // Return transporter object
  return nodeTransporter;
};

const sendEmailViaGmail = async (options) => {
  let gmailTransporter = await createTransporter();
  await gmailTransporter.sendMail(options);
};

sendEmailViaGmail({
  subject: "Exploring Gmail API",
  text: "Hi, this is a test email from Node.js using Gmail API",
  to: "bethsummer05@gmail.com",
  from: EMAIL_ADDRESS,
});
