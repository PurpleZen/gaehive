const app = require('express')();
const rateLimit = require('express-rate-limit');
const fetch = require('cross-fetch');

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
app.get('/api/user', (req, res) => {
  var user = req.query.user
  fetch(
    `https://api.scratch.mit.edu/user/` + user,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Gaehive",
      },
    }
  ).then((response)=>{return response.json();}).then(data=>{

    const username = data.username
    const id = data.id
    console.log(user)
    console.log(data)

    return res.json({ username: username, id: id })
  })
});

module.exports = app;