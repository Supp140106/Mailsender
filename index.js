const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const { generateEmailTemplate } = require('./emailTemplate');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "*",        // allow all origins
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// Nodemailer Transporter
// Option 1: Gmail with explicit configuration (works on most platforms)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password, not regular password
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

// Option 2: SendGrid (Uncomment to use - most reliable for Render)
// const transporter = nodemailer.createTransport({
//     host: 'smtp.sendgrid.net',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'apikey',
//         pass: process.env.SENDGRID_API_KEY,
//     },
// });

// Routes
app.post('/api/contact', async (req, res) => {
    try {
        const { fullName, phoneNumber, emailAddress, serviceType, message } = req.body;

        // Validate input
        if (!fullName || !phoneNumber || !emailAddress || !serviceType || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO, // Target email address
            subject: `New Inquiry: ${serviceType} - ${fullName}`,
            html: generateEmailTemplate(req.body),
        };

        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

app.get('/', (req, res) => {
    res.send('Mail Sender Server is running.');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
