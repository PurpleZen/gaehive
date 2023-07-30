const app = require('express')();

app.get('/api/auth', (req, res) => {
  res.redirect("/")
});