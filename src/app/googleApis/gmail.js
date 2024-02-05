const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// These id's and secrets should come from .env file.
const CLIENT_ID =
  "821687526755-4a7n1niuf8phj6qtes2olnmhugs46sft.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04BdJyc5k4c_GCgYIARAAGAQSNwF-L9Ir-N9rDQS-cz-irhy75jOmLG_0fJNmciflG31Of6w-CVn-Uga2c0PRQv-SOlqAhSXAtvI";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "rabbitdoughnuts@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Mr Rabbit <rabbitdoughnuts@gmail.com>",
      to: "bethsummer05@gmail.com",
      subject: "31/01/2024 11:26pm",
      text: "this is text",
      html: "<h1>lala</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log("Email sent successfully!!", result))
  .catch((error) => console.log(error.message));

export default sendMail;
