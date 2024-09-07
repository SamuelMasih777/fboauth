const axios = require('axios');

exports.getUserPages = async (req, res) => {
    
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Authorization header with Bearer token is required.' });
    }
    
    const accessToken = authHeader.split(' ')[1];

    try {
        const response = await axios.get(`https://graph.facebook.com/me/accounts`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        res.json(response.data.data);
    } catch (error) {
        console.error('Error fetching user pages:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch pages.' });
    }
};

exports.getPageInsights = async (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Authorization header with Bearer token is required.' });
    }

    const pageAccessToken = authHeader.split(' ')[1];
    const { pageId, since, until } = req.query;
    // console.log(pageId, until);
    // console.log(`Fetching insights from ${since} to ${until}`);
    
    const metrics = ['page_fans','page_impressions'];

    if (!pageId) {
        return res.status(400).json({ error: 'pageId is required.' });
    }

    try {        
        const insights = {};
        
        for (const metric of metrics) {
            const response = await axios.get(`https://graph.facebook.com/v16.0/${pageId}/insights`, {
                headers: {
                    Authorization: `Bearer ${pageAccessToken}`,
                },
                params: {
                    metric: metric,                    
                    period: 'total_over_range',
                    // since:since,
                    // until:until,
                },
            });
            const data = response.data.data;
            console.log(data);
            insights[metric] = response.data.data[0].values[0].value;
            console.log(insights);
        }

        res.json(insights);
    } catch (error) {
        console.error('Error fetching page insights:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch page insights.' });
    }
};

