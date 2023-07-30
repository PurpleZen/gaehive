const app = require('express')();

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
            localStorage['user'] = JSON.stringify({'username': res.username, 'admin': res.admin, 'manager': res.manager, 'writer': res.writer})

            localStorage.setItem("token", res.token)

            var date = new Date();
            date.setDate(date.getDate() + 14)
            localStorage.setItem("tokenExp", date)
            
            window.opener.location.reload();
            window.close()
          })
      } else {
        res.redirect("/")
      }
});