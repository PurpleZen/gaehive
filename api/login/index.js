const app = require('express')();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const { createClient } = require('@supabase/supabase-js')

app.use(cookieParser());

const cookieOptions = {
  path: '/',
  httpOnly: false,
  sameSite: 'lax',
  secure: true,
  maxAge: 7 * 24 * 3600 * 1000
};

const supabaseUrl = process.env['VITE_SUPABASE_URL']
const supabaseAnonKey = process.env['VITE_SUPABASE_ANON_KEY']

const supabase = createClient(
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

  try {
    const userinfo = await fetch('https://scratchdb.lefty.one/v3/user/info/' + json.username);
    const userdata = await userinfo.json();
    const id = userdata.id

    var manager = false
    var writer = false
    var { data } = await supabase.from('managers').select('data').eq("id", 1)
    const managers = await data[0].data
    for (var i = 0; i < managers.length; i++) {
      if (managers[i].name == json.username) {
          manager = true
          writer = true
        }
      }

    var { data } = await supabase.from('managers').select('data').eq("id", 2)
    const writers = await data[0].data
    for (var i = 0; i < writers.length; i++) {
      if (writers[i].name == json.username) {
          writer = true
        }
      }

    if (json.username == "LegoManiac04") {
      manager = true
      writer = true
    }

    if (json.valid) {
      const token = jwt.sign({ name: json.username, role: "authenticated", manager: manager, writer: writer }, process.env['SUPABASE_JWT'], { expiresIn: '14 days' });
      res.cookie('mytoken', token, cookieOptions);
      res.redirect(req.query.return + "?user=" + btoa(JSON.stringify({'username': json.username, 'id': id, 'manager': manager, 'writer': writer})))
    } else {
      return res.json({ token: "invalid" })
    }
    } catch(error) {
    return res.sendFile(path.join(__dirname, 'error.html'));
    }
});


module.exports = app;
