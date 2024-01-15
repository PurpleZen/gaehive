# Source Code Map
## ```data```

Contains ```.json``` files used to support emojis and other Hivezine features on the site. (i.e., all text matching in ```emojicode.json``` is replaced with the item at the matching index in ```emojis.json```)

## ```lib```

Contains ```.js``` files used to connect to the Supabase database, as well as files used to communicate with said database. Functions like adding birthdays and reacting to Hivezine posts use the code in these files.

## ```pages```

Contains ```.vue``` files for creating each page on the website.

## ```App.vue```

Main ```.vue``` file containting the website sidebar, container for all pages, and all styling for the site.

## ```main.js```

Main ```.js``` setup file for Vue.

## ```routes.js```

```.js``` file used for page routing with vue-router.