const app = require('express')();
const jwt = require('jsonwebtoken');
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient('https://krtafulrwvxmpzmuqjbf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGFmdWxyd3Z4bXB6bXVxamJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE3ODcxOTMsImV4cCI6MjAwNzM2MzE5M30.febzjg767tHBjXEcPF1Z1SuAG0k30L4JjEoSuIgihI4')
const Cookies = require('js-cookie');

app.get('/api', async (req, res) => {
  const result = await fetch('https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=' + req.query.privateCode);
  const json = await result.json();

  if (json.valid) {
    const token = jwt.sign({ name: json.username, role: "authenticated", level: "manager" }, process.env['SUPABASE_JWT'], { expiresIn: '14 days' });
    res.status(200).setHeader('Set-Cookie', serialize('mytoken', token, { path: "/" }));
    const { user, error } = supabase.auth.setAuth(Cookies.get("mytoken"))
    
  } else {
    return res.json({ token: "invalid" })
  }
});


module.exports = app;
