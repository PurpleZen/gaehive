const app = require('express')();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const cookieOptions = {
  path: '/',                    // Send the cookie to all routes
  httpOnly: false,               // Make the cookie not accessible by document.cookie
  sameSite: 'lax',              // Allow incoming links (but not requests) to include the cookie
  secure: true,                 // Make sure the cookie is secure
  maxAge: 7 * 24 * 3600 * 1000  // The cookie expires in 7 days
};

app.get('/api', async (req, res) => {
  const result = await fetch('https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=' + req.query.privateCode);
  const json = await result.json();

  if (json.valid) {
    const token = jwt.sign({ name: json.username, role: "authenticated", level: "manager" }, process.env['SUPABASE_JWT'], { expiresIn: '14 days' });
    res.cookie('mytoken', token, cookieOptions);
    res.redirect("/")
  } else {
    return res.json({ token: "invalid" })
  }
});


module.exports = app;
