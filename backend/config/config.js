const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    CLIENT_ID :process.env.CLIENT_ID,
    CLIENT_SECRET :process.env.CLIENT_SECRET,
    REDIRECT_URL :process.env.REDIRECT_URL,
    REFRESH_TOKEN : process.env.REFRESH_TOKEN,
    EMAIL_USER : process.env.EMAIL_USER
};
