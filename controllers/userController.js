const axios = require('axios');

exports.getUserProfile = async (req, res) => {
    
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Authorization header with Bearer token is required.' });
    }
    
    const accessToken = authHeader.split(' ')[1];

    try {
        const response = await axios.get(`https://graph.facebook.com/me`, {
            params: {
                access_token: accessToken,
                fields: 'id,name,picture',
            },
        });
        res.json(response.data);
    } catch (error) {
        const errorCode = error.response?.data?.error?.code;        

        if (errorCode === 2500) {
            return res.status(400).json({ error: 'Invalid or expired access token. Please authenticate again.' });
        }

        console.error('Error fetching user profile:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch user profile.' });
    }
};
