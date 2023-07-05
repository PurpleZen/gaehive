const app = require('express')();
const fetch = require('cross-fetch');

app.get('/api/archives/comments', (req, res) => {
  fetch(
    `https://api.scratch.mit.edu/studios/5842709/comments?limit=1`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Gaehive",
      },
    }
  ).then((response)=>{return response.json();}).then(data=>{

    const comments = data;

    res.json(comments)
  })
  })
});

module.exports = app;