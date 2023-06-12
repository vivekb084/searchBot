# searchBot
****Help me continue my research by provide some funding. UPI ID - vivekb084@okicici (Within India)****

Chat bot that search query on google

# Run Application
```
npm start
```

# Code Flow 

* Read the message content
* Check if message content is hi then reply hey
* Check if message content start with !google then extract query string and remove white spaces.
* Check if user has search same query before then update timestamp of that query in history ,  else store query with userid in history table.
* Check if result of query is store in db then reply with result else fetch top 5 google result , after storing in db , Reply with those results


# NOTE

For searching on google we are using trial version of library that is limited to 50 requests per month


# INVITE LINK

https://discord.gg/rN4SJ7U
