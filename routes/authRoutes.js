const express = require('express');
const { facebookLogin } = require('../controllers/authController');

const router = express.Router();

router.get('/facebook/callback', facebookLogin);
router.get('/facebook', (req, res) => {
    const redirectUri = encodeURIComponent('http://localhost:5000/api/auth/facebook/callback');
    const facebookAuthUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${process.env.FB_APP_ID}&redirect_uri=${process.env.FB_REDIRECT_URI}&response_type=code&scope=public_profile,email,pages_show_list`;
    // console.log('Facebook Auth URL:', facebookAuthUrl);
    res.redirect(facebookAuthUrl);
  });

module.exports = router;
