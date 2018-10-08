# Blacklistr
## Chrome Extention for blacklisting channels on youtube

I decided to create this project because there are a few channels on youtube that I just got sick of showing up in my searches, and **youtube doesn't have a blacklist for some reason**, so I took matters into my own hands.

This extention works by navigating the search results, and identifying the channel that uploaded the video, then targeting that video via CSS
and finally removing it from the DOM entirely.
Not only does this remove those annoying channels, but having fewer search results to keep rendered / taking up memory is always a plus.

 - NOTE : Because youtube has 'infinite scroll', I had to account for that as well, so sometimes if you get to a search result page, and you see unwanted content, just scroll and it should go away. :)

 - Bonus : This extention uses localStorage to keep track of your blacklist, so assuming you don't clear it out, you can close the browser and come back and you should still have your list intact.


## Features to come

 - The ability to remove videos from your dash
 - The ability to remove videos based on title
 - The ability to show or hide the extention via keyboard shortcut.
 - The ability to open the modal again (I haven't had time to implement the browser action feature yet.)

### potential ideas

 - The ability to remove videos based on certain words IN the title.
 - If YT has a tag system, the ability to remove based on tags.

# ADDING THE EXTENTION TO YOUR CHROME:
 - go here: **```https://chrome://extensions/```**
 - activate developer mode at the top right
 - on the left click "load unpacked" and browse to the directory where your js files is located.
 - that's it :) Any search result will now remove videos from channels on your blacklist
