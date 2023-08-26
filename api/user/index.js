const app = require('express')();
const rateLimit = require('express-rate-limit');
const fetch = require('cross-fetch');

// Limit how many requests can be made to prevent users from potentially spamming the Scratch servers.
const apiRequestLimiter = rateLimit({
  windowMs: 0.05 * 60 * 1000,
  max: 1,
  message: { 'error': 'too many requests' },
  standardHeaders: true, 
  legacyHeaders: false,
})

app.use(apiRequestLimiter)

// New posts are fetched from the studio here, compiled, and sent back to the backend server to be stored!
app.get('/api/user', (req, res) => {
  let user = req.query.name
  fetch(
    `https://api.scratch.mit.edu/users/` + user,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Gaehive",
      },
    }
  ).then((response)=>{return response.json();}).then(data=>{

    const username = data.username;
    const id = data.id;

    
    res.json({
      username: username, id: id
    })
  })
});

module.exports = app;
