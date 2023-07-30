const app = require('express')();

const cookieOptions = {
  path: '/',                    // Send the cookie to all routes
  httpOnly: false,               // Make the cookie not accessible by document.cookie
  sameSite: 'lax',              // Allow incoming links (but not requests) to include the cookie
  secure: true,                 // Make sure the cookie is secure
  maxAge: 7 * 24 * 3600 * 1000  // The cookie expires in 7 days
};

app.get('/api/auth/verify', (req, res) => {
  
      if (req.query.privateCode) {     fetch(`https://gaehivecloset.fizzyizzy.repl.co/login`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            privateCode: req.query.privateCode
          })
        })
        .then(res => res.json())
          .then((res) => {
            res.cookie('user', JSON.stringify({'username': res.username, 'admin': res.admin, 'manager': res.manager, 'writer': res.writer}), cookieOptions)

            res.cookie("token", res.token, cookieOptions)

            var date = new Date();
            date.setDate(date.getDate() + 14)
            res.cookie("tokenExp", date)
            
            res.redirect("/")
          })
      } else {
        res.redirect("/")
      }
});

module.exports = app;