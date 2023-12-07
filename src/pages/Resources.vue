<template>
  <h1 class="greeting">Resources</h1>
  <span>It's important for us to make sure you all have resources that can help you and others stay safe. Here you can find links to useful resources, as well as <a href='https://scratch.mit.edu/contact-us/'>Contact Us</a> templates for users who need help and for reporting trolls.
<br><b>If you are in crisis or suicidal, please contact one of the hotlines listed below or your local emergency number. You are not alone.</b></span>

  <div class="titlename">
    <h3>Hotlines</h3>
  </div>
  <div class="content">
    <i>
      -> <a href="https://www.thetrevorproject.org/" target="_blank">
        <span>The Trevor Project</span>
      </a>
      <br>
      -> <a href="https://www.imalive.org/" target="_blank">
        <span>IMAlive</span>
      </a>
      <br>
      -> <a href="https://988lifeline.org/" target="_blank">
        <span>National Suicide Prevention Lifeline</span>
      </a>
      <br>
      -> <a href="https://scratch.mit.edu/studios/29543068/" target="_blank">
        <span>Extended Hotline List</span>
      </a>
    </i>
  </div>

  <div class="break"></div>

  <div class="titlename">
    <h3>Contact Us Templates</h3>
  </div>
  <span>These templates can be copied and pasted into <a href='https://scratch.mit.edu/contact-us/'>Contact Us</a>, however you will need to edit in the important information. You should input the needed information in place of the "&lt; >" symbols, and extra/suggested info in place of the "[+ ]" symbols if applicable.</span>

    <div class="posts">
      <div class="post">
        <div class="title">
          <h3>Help Template</h3>
        </div>
        <textarea class="content" type="text" rows="9" value="Hello Scratch Team,
There has been a user, @<username>, who has been making concerning comments. They have been talking about/mentioning <what they've been saying>, and I think they need help. 
          
If you could send them some help, I would really appreciate it, and I hope it will help them.
          
[+ Here are some screenshots of what they've been saying attached below:]
Thank you." @focus="$event.target.select()"> </textarea>
      </div>

      <div class="post">
        <div class="title">
          <h3>Troll Template</h3>
        </div>
        <textarea class="content" type="text" rows="10" value="Hello Scratch Team,
There has been a user, @<username>, who has been trolling our studio (https://scratch.mit.edu/studios/5842709/comments/).
          
They've been saying <what they've been doing/saying>. We've been reporting their comments and not interacting as much as possible, however they are not stopping. If you could help us out with this user, it would be greatly appreciated!
          
[+ Here are some screenshots of what they've been saying attached below:]
Thank you." @focus="$event.target.select()"></textarea>
      </div>

      <div class="post">
        <div class="title">
          <h3>Disrespectful User Template</h3>
        </div>
        <textarea class="content" type="text" rows="10" value="Hello Scratch Team,
There has been a user, @<username>, who has been disrespectful in/disrespectful to me in this studio (https://scratch.mit.edu/studios/5842709/comments/). 
          
They've been <what they've been doing/saying>. We've/I've tried talking to them and reporting any disrespectful comments, but this has not stopped them. If you could help us/me out with this user, it would be greatly appreciated!
          
[+ Here are some screenshots of what they've been saying attached below:]
Thank you." @focus="$event.target.select()"></textarea>
      </div>

      <div class="post">
        <div class="title">
          <h3>Inappropriate Comments Template</h3>
        </div>
        <textarea class="content" type="text" rows="15" value="Hello Scratch Team,
There has been a user, @<username>, who has been talking about inappropriate topics in our studio (https://scratch.mit.edu/studios/5842709/comments/). 

They've been talking about <what they've been saying>. We've been reporting their inappropriate comments, but this has not stopped them.

[+ I believe they used to be @<username>, where they also talked about inappropriate topics, and they're now ban evading on this account.]
          
If you could help us out with this user, it would be greatly appreciated!
          
[+ Here are some screenshots of what they've been saying attached below:]
Thank you." @focus="$event.target.select()"></textarea>
      </div>
    </div>

  <div class="break"></div>
  
  <div class="titlename">
    <h3>Extra Resources</h3>
  </div>
  <a href="https://scratch.mit.edu/studios/30962694/comments">
    <span>Support & Resources</span>
  </a>

  <div class="break"></div>
</template>

<script>
  import { useMeta } from 'vue-meta'
  export default {
    created() {
      useMeta({
        title: 'Gaehive • Resources'
      });
    }
  }
</script>