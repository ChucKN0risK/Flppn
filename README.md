Flppn Chrome Extension
======================

You'll be able to find here a guide to understand the extension's architecture. 

## Extension Features
* Allow the user to save a page URL in his account.
    * **How ?** => By clicking on a created element on the page.
    * **What does it imply ?** => We need to interact with the page the user loads (as opposed to pages that are included in the extension). Then our extension must include a `contentscript`. It's best to not think of content scripts as part of your extension but as part of the content they are interracting with. Also content scripts can't call functions defined by your extension (in your background script for example). [Since we want to save the URL of the page we need permission to access the tabs](https://developer.chrome.com/extensions/tabs#manifest). 
* Allow the user to visit his Flppn account and to disconnect   
    * **How ?** : When clicking on the extension icon in the browser actions a popup will appear with 2 links. One redirecting to the account and the other disconnecting the user.
    * **What does it imply ?** => This feature is part of our extension main logic. So the file script we want to write in is `background.js`.

## Architecture Logic
We define the user journey we want to provide and then we build our architecture based on this journey.
1. The user installs the Flppn extension and gets redirected on the flppn website where he is invited to create his account.
2. The user create an account.
3. Later, the user visits his favourite porn website. When hovering a video a smartSaveButton appears on the video. 
4. When clicking the smartSaveButton the video is saved to his account and the smartSaveMenu appears.
5. Saved video can be attached to one or several collection. These collections are listed in the smartSaveMenu. If the user clicks on a collection then the video is linked to it, a confirmation message appears and the smartSaveMenu closes itself.
5bis. If the user writes in the field the name of an unknown collection then typing on the "Enter" key will create the new collection, link the video to this newly created collection and the smartSaveMenu closes itself.

Since we only want to display the smartSaveButton and the smartSaveMenu on certain website we will need to initialize these two classes only if the current tab has a valid URL. This validation concerns the main logic of our extension so it will be written in our `background.js`. However our two classes : smartSaveButton and smartSaveMenu will respectively by written in `smartSaveButton/scripts/smartSaveButton.js` and `smartSaveMenu/scripts/smartSaveMenu.js`.

This framework is built over several years of front-end development knowledge. It is as agnostic as possible. The only thing I focused on was to make the sass as modular and automated as possible helping you writing style over fixing/maintaining it.

You can drop me a line on [@chuckn0risK](www.twitter.com/chuckn0risk)

## Requirements
* [node.js 0.12.x/npm](http://nodejs.org/download/)

## Development Features

* Render elements consistently with [Sanitize.css](https://github.com/jonathantneal/sanitize.css/blob/master/sanitize.scss)  
* Responsive Typography with : [Modular Scale](https://github.com/modularscale/modularscale-sass) + [Responsive Modular Scale](https://github.com/gakimball/responsive-modular-scale)  
For further informations about Responsive Web Typography: [Pro Web Type](https://prowebtype.com)
* [SMACSS Architecture](https://smacss.com/)
* [Media Queries With Superpowers](https://github.com/sass-mq/sass-mq)
* [Automated Sass documentation](http://sassdoc.com/)
Just go to: `path/to/your/directory/sassdoc`
* Build process with Gulp which includes:
    * Live preview server (using [BrowserSync](http://www.browsersync.io/))
    * Image optimization
    * CSS Autoprefixing
    * Sass compilation
    * SVG Spriting (generate PNG fallbacks with [svg4everybody](https://github.com/jonathantneal/svg4everybody) for accessibility)

## Getting Started

1. If you already have MAMP/WAMP installed go to the corresponding folder : `/www` for Windows or `/htdocs` for OSX.
Don’t forget to launch your Apache server.

2. Clone this repo in your dev directory via your git interface or via your CLI (Command Line Interface). I personally use [iTerm](https://iterm2.com/).

3. Once you are in the repo directory download node packages : `(sudo) npm install`. It will download all the packages listed in the `package.json` situated at the root of the project.

4. Since we use [BrowserSync](http://www.browsersync.io/) in our Gulp build process you have to set your own 'proxy’. Create at the root of the project the `localconfig.json` file so it suits your own configuration : 
```json
{
    "serverName": "localhost:XXXX/",
    "subDirectory": "path/to/your/directory",
    "enableBrowserSync": true
}
```

5. When you're done you can compile the assets and start the server with the `gulp` command.

## Sass Architecture

```
└── scss
    ├── base
    ├── components
    ├── fonts
    ├── layouts
    ├── pages
    ├── tools
    ├── vendors
    └── style.scss
    └── styleguide.scss
```

