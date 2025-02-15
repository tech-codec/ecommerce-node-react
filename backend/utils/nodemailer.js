const nodemailer = require('nodemailer');
const path = require('path');
const {google} = require('googleapis')
require("dotenv").config();


CLIENT_URL = process.
CLIENT_URL= process.env.CLIENT_URL  
CLIENT_ID = process.env.CLIENT_ID 
CLIENT_SECRET = process.env.CLIENT_SECRET 
REDIRECT_URL = process.env.REDIRECT_URL 
REFRESH_TOKEN = process.env.REFRESH_TOKEN
EMAIL_USER = process.env.EMAIL_USER 

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
)

oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const accessToken = async ()=> (await oAuth2Client.getAccessToken());


const transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken(),
    },
});

(async () => {
    const { default: hbs } = await import('nodemailer-express-handlebars');

    const handlebarOptions = {
        viewEngine: {
            extName: '.hbs',
            layoutsDir: path.resolve('./views/email/'),
            defaultLayout: 'template',
        },
        viewPath: path.resolve('./views/email/'),
        extName: '.hbs',
    };

    transporter.use('compile', hbs(handlebarOptions));

})();

module.exports = transporter;