const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// These id's and secrets should come from .env file.
const CLIENT_ID =
  "821687526755-4a7n1niuf8phj6qtes2olnmhugs46sft.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04oQ84vCOiH-9CgYIARAAGAQSNwF-L9Irh2KuM6lKhLQZUHBiI6qBjGxSEj4Gf-9fsufD8RgDn6PcFtkWf6SGKImdppWz4lbVnng";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "yours authorised email address",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "SENDER NAME <rabbitdoughnuts@gmail.com>",
      to: "bethsummer@gmail.com",
      subject: "Hello from gmail using API",
      text: "Hello from gmail email using API",
      html: "<h1>Hello from gmail email using API</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log("Email sent...", result))
  .catch((error) => console.log(error.message));

// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");

// // const CLIENT_ID = process.env.CLIENT_ID;
// // const CLIENT_SECRET = process.env.CLIENT_SECRET;
// // const REDIRECT_URL = process.env.REDIRECT_URL;
// // const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// CLIENT_ID =
//   "821687526755-4a7n1niuf8phj6qtes2olnmhugs46sft.apps.googleusercontent.com";
// CLIENT_SECRET = "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";
// REDIRECT_URL = "https://developers.google.com/oauthplayground";
// REFRESH_TOKEN =
//   "1//04oQ84vCOiH-9CgYIARAAGAQSNwF-L9Irh2KuM6lKhLQZUHBiI6qBjGxSEj4Gf-9fsufD8RgDn6PcFtkWf6SGKImdppWz4lbVnng";
// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URL
// );

// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// async function sendMail() {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "rabbitdoughnuts@gmail.com",
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });

//     const mailOptions = {
//       from: "rabbitdoughnuts@gmail.com",
//       // to: req.params.email,
//       to: "bethsummer05@gmail.com",
//       subject: "this is subject",
//       text: "this is text",
//       html: "<h1>this is msg</h1>",
//     };

//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

// sendMail()
//   .then((result) => console.log("Email sent...", result))
//   .catch((error) => console.log(error.message));
