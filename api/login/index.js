app.get('/api/login', async (req, res) => {
  if (req.query.privateCode) {
    res.redirect('https://thegaehive.fizzyizzy.repl.co/login?privateCode=' + req.query.privateCode)
  } else {
    res.redirect(
      'https://auth.itinerary.eu.org/auth/?redirect=' +
      Buffer.from('https://gaehivecloset.fizzyizzy.repl.co/login').toString('base64') +
      '&name=the Gaehive website&authProject=867214083'
    );
  }
});