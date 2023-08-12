const app = require('express')();
const jwt = require('jsonwebtoken');
import { createClient } from '@supabase/supabase-js'
const options = {
  auth: {
    persistSession: false
}
}
export const supabase = createClient('https://krtafulrwvxmpzmuqjbf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGFmdWxyd3Z4bXB6bXVxamJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE3ODcxOTMsImV4cCI6MjAwNzM2MzE5M30.febzjg767tHBjXEcPF1Z1SuAG0k30L4JjEoSuIgihI4', options)
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const cookieOptions = {
  path: '/',                    // Send the cookie to all routes
  httpOnly: true,               // Make the cookie not accessible by document.cookie
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
    const { user, error } = supabase.auth.setAuth(req.cookies.mytoken)
    
  } else {
    return res.json({ token: "invalid" })
  }
});


module.exports = app;
