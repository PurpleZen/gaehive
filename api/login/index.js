const app = require('express')();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const cookieOptions = {
  path: '/',
  httpOnly: false,
  sameSite: 'lax',
  secure: true,
  maxAge: 7 * 24 * 3600 * 1000
};

app.get('/api/login', async (req, res) => {
  const result = await fetch('https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=' + req.query.privateCode);
  const json = await result.json();

  const userinfo = await fetch('https://scratchdb.lefty.one/v3/user/info/' + json.username);
  const userdata = await userinfo.json();
  const id = userdata.id

  if (json.valid) {
    const token = jwt.sign({ name: json.username, role: "authenticated", level: "manager" }, process.env['SUPABASE_JWT'], { expiresIn: '14 days' });
    res.cookie('mytoken', token, cookieOptions);
    res.redirect("/?user=" + btoa(JSON.stringify({'username': json.username, 'id': id})))
  } else {
    return res.json({ token: "invalid" })
  }
});


module.exports = app;
