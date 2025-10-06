Stratify - Netlify deployment (No Firebase)
==========================================

Contents:
- index.html
- styles.css
- app.js
- netlify/functions/sendEmail.js
- netlify.toml
- package.json

Setup & Deploy:
1. Zip this project and deploy on Netlify (drag & drop) OR push to GitHub and connect Netlify.
2. On Netlify site settings -> Build & deploy -> Environment -> Environment variables, set:
   - SMTP_USER = your SMTP username (e.g., your Gmail address)
   - SMTP_PASS = app password or SMTP password
   - (Optional) SMTP_HOST, SMTP_PORT, EMAIL_FROM, EMAIL_TO (defaults to nefcore.sec@gmail.com)
3. Deploy. Netlify will install dependencies (nodemailer) and build functions.
4. Test the site: fill the form and click "Pay ₹99 & Submit" (this simulates payment then sends email).

Gmail notes:
- If using Gmail, enable an App Password (recommended) and use that as SMTP_PASS.
- For personal Gmail accounts, you might need to enable 'Less secure apps' or use app password.

Next steps:
- After the site is live (a netlify.app URL), we will integrate Razorpay live keys.
