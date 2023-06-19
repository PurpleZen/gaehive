<template>
  <div class="page">
  <div class="container">
  <div id="text" class="queue">
    <h1 class="greeting">Resources</h1>
    <span>It's important for us to make sure you all have resources that can help you and others stay safe. Here you can find links to useful resources, as well as <a href='https://scratch.mit.edu/contact-us/'>Contact Us</a> templates for users who need help and for reporting trolls.</span>
    <span>These templates can be copied and pasted into Contact Us, however you will need to edit in the important information. You should input the needed information in place of the "&lt; >" symbols, and extra/suggested info in place of the "[+ ]" symbols.</span>

    <h3>Troll Template:</h3>
  <textarea type="text" rows="8" value="Hello Scratch Team,
There has been a user, @<username>, who has been trolling our studio (https://scratch.mit.edu/studios/5842709/comments/) [+ and this studio <link>][+ and this user/users: <username(s)>]. They've been saying <what they've been doing/saying>. We've been reporting their comments and not interacting as much as possible, however they are not stopping. I believe you need to take action against this user. [+ Here are some screenshots of what they've been saying attached below:]
Thanks!" @focus="$event.target.select()"></textarea>
  
  <h3>Help Template:</h3>
  <textarea type="text" rows="6" value="Hello Scratch Team,
There has been a user, @<username>, who has been making concerning comments. They have been talking about/mentioning <what they've been saying>, and I think they need help.
[+ Here are some screenshots of what they've been saying attached below:]
Thank you." @focus="$event.target.select()"></textarea>
  </div>
  </div>

  </div>
</template>