const app = require('express')();
const fetch = require('cross-fetch');

app.get('/api/img/:id', async (req, res) => {
  fetch(
    `https://uploads.scratch.mit.edu/get_image/project/` + req.params.id + `_300x300.png`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Gaehive",
      },
    }
  ).then(response => response.blob())
  .then(blob => {
    res.type(blob.type)
    blob.arrayBuffer().then((buf) => {
      res.send(Buffer.from(buf))
    })
  })
})

module.exports = app;