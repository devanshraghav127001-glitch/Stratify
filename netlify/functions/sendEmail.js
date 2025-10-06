const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  try {
    const body = JSON.parse(event.body || '{}');
    const payload = body.payload || {};

    // The SMTP credentials must be set as Netlify environment variables:
    // SMTP_HOST (optional), SMTP_PORT (optional), SMTP_USER, SMTP_PASS
    // EMAIL_TO (default to nefcore.sec@gmail.com)
    const to = process.env.EMAIL_TO || 'nefcore.sec@gmail.com';
    const from = process.env.EMAIL_FROM || process.env.SMTP_USER || 'Stratify <no-reply@stratify.example>';

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const html = `
      <h3>New Registration on Stratify</h3>
      <ul>
        <li><strong>Full Name:</strong> ${payload.fullname || ''}</li>
        <li><strong>Phone Number:</strong> ${payload.phone || ''}</li>
        <li><strong>Address:</strong> ${payload.address || ''}</li>
        <li><strong>Age:</strong> ${payload.age || ''}</li>
        <li><strong>WhatsApp Number:</strong> ${payload.whatsapp || ''}</li>
        <li><strong>City:</strong> ${payload.city || ''}</li>
        <li><strong>Email Address:</strong> ${payload.email || ''}</li>
      </ul>
    `;

    await transporter.sendMail({
      from,
      to,
      subject: 'New Stratify registration',
      html
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('sendEmail error:', err);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: err.message }) };
  }
};
