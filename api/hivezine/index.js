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

    const title = data;
    const id = data[0].id

    fetch(
    `https://api.scratch.mit.edu/studios/33586934/comments/` + id + `replies`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Gaehive",
      },
    }
  ).then((response)=>{return response.json();}).then(data=>{

    const post = data;
    const body = title.concat(post)
    res.json(body)
  })
});

module.exports = app;