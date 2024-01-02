const app = require('express')();
const jwt = require('jsonwebtoken');
const fetch = require('cross-fetch');

const token = jwt.sign({ role: "authenticated", cron: process.env['CRON_SECRET'] }, process.env['SUPABASE_JWT'], { expiresIn: '1m' });

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
    },
    global: { 
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
)

app.get('/api/birthdays', (req, res) => {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  } else {
    fetch(
      `https://api.scratch.mit.edu/studios/34421126`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 Gaehive",
        },
      }
    ).then((response)=>{return response.json();}).then(async data=>{

      const { error } = await supabase
        .from('birthdays')
        .update({ users: JSON.parse(data.description) })
        .eq("id", 1)

      res.json([{ birthdays: "updated 🎉" }])
    })
  }
});

module.exports = app;