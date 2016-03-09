laser-kitten
=============
A Product Hunt app for the Mac

![laser kitten screenshot](http://imns.github.io/img/laser-kitten/product-hunt-preview@1500.jpg)


# Why?
I wanted to build an Electron App with ReactJS.  I really like Product Hunt, but I only saw menubar apps available in the App store and I wanted something I could have sitting on my second monitor at all times.


# Download
Download the latest version [here](https://github.com/imns/laser-kitten/releases/download/v0.0.2-alpha/lazer-kittin_0.0.2.dmg.zip)


# Stack
- Electron
- ReactJS
- RefluxJS
- Twitter Bootstrap


# Development

#### 1. Installation
1. Install the dev dependecies `npm install`
2. Install the applications dependecies`cd app/` and run `npm install`
3. Run Gulp `gulp build`.  This will watch for any changes in the JSX or LESS files and recompile them.


#### 2. Run the app
1. Open up app.js and make sure `DEBUG = true`.  
1. Run the app with the cmd `electron .`.  This should be run in the main dirctory.


# Pull Requests
^ are welcome


### TODOs
- [ ] Previous Post Day always says Today
- [ ] If you aren't signed in and click on a users name it takes you to the login screen
- [ ] Allow HTML in Comments and auto convert links to be clickable
- [ ] Max media size
- [ ] Add an about page
- [ ] Default msg when no content is available
- [ ] Load more ... everything with Infinite Scroll
- [ ] Redo the CSS and HTML cause it sucks
- [ ] Add a back button.  This could potential use react routers history plugin
- [ ] Switch to using Redux and Webpack like the cool kids


# License

GNU General Public License v3.0

Copyright (c) 2016 Nate Smith