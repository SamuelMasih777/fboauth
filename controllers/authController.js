const axios = require('axios');
const { fbAppId, fbAppSecret, fbRedirectUri } = require('../config/config');

const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v20.0';

exports.facebookLogin = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is required.' });
    }

    try {        
        const { data } = await axios.get(`${FACEBOOK_GRAPH_API_BASE_URL}/oauth/access_token`, {
            params: {
                client_id: fbAppId,
                redirect_uri: fbRedirectUri,
                client_secret: fbAppSecret,
                code,
            },
        });

        const { access_token } = data;

        if (!access_token) {
            return res.status(500).json({ error: 'Failed to retrieve access token from Facebook.' });
        }
        
        // res.json({ accessToken: access_token });
        res.redirect(`http://localhost:3000/callback?token=${access_token}`);

    } catch (error) {
        console.error('Error during Facebook login:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to exchange token with Facebook.' });
    }
};
