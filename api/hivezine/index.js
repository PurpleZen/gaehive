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
  fetch(
    `https://api.scratch.mit.edu/studios/33586934/comments?limit=1`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Gaehive",
      },
    }
  ).then((response)=>{return response.json();}).then(data=>{

    const title = data[0].content;
    const user = data[0].author.username;
    const uid = data[0].author.id;
    const id = data[0].id;

    fetch(
    `https://api.scratch.mit.edu/studios/33586934/comments/` + id + `/replies`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Gaehive",
      },
    }
  ).then((response)=>{return response.json();}).then(data=>{

    var post = data[0].content
    for ( var i = 1; i < data.length; i++ ) {
      post = post + " " + data[i].content;
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const d = new Date();
      let date = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
    
    res.json([{
      user: user, uid: uid, date: date, title: title, post: post
    }])
  })
  })
});

module.exports = app;
