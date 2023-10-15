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
app.get('/api/hivezine', (req, res) => {
  const username = req.query.username
  fetch(
    `https://api.scratch.mit.edu/studios/33586934/comments?limit=5`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Gaehive",
      },
    }
  ).then((response)=>{return response.json();}).then(data=>{

    for ( var i = 0; i < data.length; i++ ) {
      if (data[i].author.username == username) {
        break;
      }
    }

    const post = data[i].content;
    const user = data[i].author.username;
    const uid = data[i].author.id;
    const id = data[i].id;

    if (data[i].reply_count > 0) {
      fetch(
      `https://api.scratch.mit.edu/studios/33586934/comments/` + id + `/replies/?limit=25`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 Gaehive",
        },
      }
      ).then((response)=>{return response.json();}).then(data=>{

        for ( var i = 0; i < data.length; i++ ) {
          post = post + data[i].content;
        }
      })
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const d = new Date();
      let date = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
    
    res.json([{
      user: user, uid: uid, date: date, title: title, post: post, pid: id
    }])
});

module.exports = app;