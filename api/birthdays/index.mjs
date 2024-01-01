const app = require('express')();
const rateLimit = require('express-rate-limit');
const fetch = require('cross-fetch');

import { createClient } from '@supabase/supabase-js'

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

// Limit how many requests can be made to prevent users from potentially spamming the Scratch servers.
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  message: { 'error': 'too many requests' },
  standardHeaders: true, 
  legacyHeaders: false,
})

app.use(apiRequestLimiter)

// New posts are fetched from the studio here, compiled, and sent back to the backend server to be stored!
app.get('/api/birthdays', async (req, res) => {
  fetch(
    `https://api.scratch.mit.edu/studios/34421126/`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Gaehive",
      },
    }
  ).then((response)=>{return response.json();}).then(data=>{

    var desc = data.description;

    const { error } = await supabase
    .from('birthdays')
    .update({ users: JSON.parse(desc) })
    .eq("id", 1)

    res.json({
      birthdays: "updated"
    })
  })
});

module.exports = app;