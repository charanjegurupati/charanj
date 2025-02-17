const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/form', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String
});

const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    const { name, email, number } = req.body;

    // Validate email and phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email format');
    }

    if (!phoneRegex.test(number)) {
        return res.status(400).send('Invalid phone number format');
    }

    const user = new User({ name, email, number });
    await user.save();

    res.send('Form submitted successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
