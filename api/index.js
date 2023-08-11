const app = require('express')();
const jwt = require('jsonwebtoken');
const supabase = require('@supabase/supabase-js')
const Cookies = require('js-cookie');

app.get('api/:code', async (req, res) => {
  const result = await fetch('https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=' + req.params.code);
  const json = await result.json();

  if (json.valid) {
    const token = jwt.sign({ name: json.username, role: "authenticated", level: "manager" }, process.env['SUPABASE_JWT'], { expiresIn: '14 days' });
    res.status(200).setHeader('Set-Cookie', serialize('mytoken', token, { path: "/" }));
    supabase.auth.setAuth(Cookies.get("mytoken"))
    
  } else {
    return res.json({ token: "invalid" })
  }
});


module.exports = app;
