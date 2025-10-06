// app.js - simplified: no Firebase. Simulated payment flow, then emails via Netlify function.
const form = document.getElementById('registrationForm');
const statusEl = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = '';
  const formData = Object.fromEntries(new FormData(form).entries());

  // Simulate payment flow (for now)
  statusEl.textContent = 'Opening payment...';
  // Fake delay to mimic payment
  await new Promise(res => setTimeout(res, 900));

  // Show fake payment success
  statusEl.textContent = '✅ Payment Successful. Sending your details...';

  try {
    const res = await fetch('/.netlify/functions/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: formData })
    });
    const data = await res.json();
    if (data && data.success) {
      statusEl.textContent = '✅ Registration submitted successfully! We will contact you soon.';
      form.reset();
    } else {
      console.error('sendEmail response', data);
      statusEl.textContent = '❌ Submission failed. Try again later.';
    }
  } catch (err) {
    console.error('Error sending:', err);
    statusEl.textContent = '❌ Submission failed (network). Try again later.';
  }
});
