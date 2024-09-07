require('dotenv').config();

module.exports = {
    fbAppId: process.env.FB_APP_ID,
    fbAppSecret: process.env.FB_APP_SECRET,
    fbRedirectUri: process.env.FB_REDIRECT_URI,
};
