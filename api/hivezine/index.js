const app = require('express')();
const fetch = require('cross-fetch');

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
    const id = data[0].id

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
      post = post + data[i].content;
    }
    
    res.json({
      title: title, post: post
    })
  })
  })
});

module.exports = app;