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

import { createClient } from '@supabase/supabase-js'

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

  export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      }
    }
  )

app.get('/api/login', async (req, res) => {
  const result = await fetch('https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=' + req.query.privateCode);
  const json = await result.json();

  const userinfo = await fetch('https://scratchdb.lefty.one/v3/user/info/' + json.username);
  const userdata = await userinfo.json();
  const id = userdata.id

  var level = "user"
  const { data } = await supabase.from('managers').select('data')
  const managers = data[0].data
  if (managers.includes(json.username)) {
    level = "manager"
  }
  if (json.username == "LegoManiac04") {
    level = "manager"
  }

  if (json.valid) {
    const token = jwt.sign({ name: json.username, role: "authenticated", level: "manager" }, process.env['SUPABASE_JWT'], { expiresIn: '14 days' });
    res.cookie('mytoken', token, cookieOptions);
    res.redirect("/?user=" + btoa(JSON.stringify({'username': json.username, 'id': id, 'level': level})))
  } else {
    return res.json({ token: "invalid" })
  }
});


module.exports = app;
