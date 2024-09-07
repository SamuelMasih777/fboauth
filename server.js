const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const pageRoutes = require('./routes/pageRoutes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get('/',(req, res)=>{
  res.send('Hello we are at Home-Page of fb-Oauth')
})
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/pages', pageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
