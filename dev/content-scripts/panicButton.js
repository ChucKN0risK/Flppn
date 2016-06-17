/**
 * Created by antoinemoreaux on 15/06/2016.
 */

var getFavicon = function () {
  var nodeList = document.getElementsByTagName("link");
  for (var i = 0; i < nodeList.length; i++)
  {
    if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
    {
      var favicon = nodeList[i].getAttribute("href");
    }
  }
  return favicon;
};


var panicButton = function(){

  this.state = 'hidden';
  this.ifrm = document.createElement('iframe');
  this.favicon = document.createElement('link');
  this.title = document.getElementsByTagName('title')[0];
  this.originalTitle = document.getElementsByTagName('title')[0].text;
  this.originalFavicon = document.createElement('link');
  this.fakeTitle = 'NoSQL — Wikipédia';
  this.fakeUrl = 'https://fr.wikipedia.org/wiki/NoSQL';
  this.fakeIcon ='https://fr.wikipedia.org/static/favicon/wikipedia.ico';
  this.constructor();
};

panicButton.prototype = {

  constructor:function(){

    var _this = this;
    this.ifrm.setAttribute('src', this.fakeUrl);
    this.ifrm.style.width = '100%';
    this.ifrm.style.height = '100%';
    this.ifrm.style.zIndex = '9999999999999';
    this.ifrm.style.visibility = 'hidden';
    this.ifrm.style.top = 0;
    this.ifrm.style.left = 0;
    this.ifrm.style.position = 'fixed';


    this.originalFavicon.setAttribute('rel', 'shortcut icon');
    this.originalFavicon.setAttribute('href', getFavicon());

    this.favicon.setAttribute('rel', 'shortcut icon');
    this.favicon.setAttribute('href', this.fakeIcon);

    document.body.appendChild(this.ifrm);

    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 27 && focus !== true) {
        _this.display();
        e.preventDefault();
      }
    });

  },

  display: function(){

    if(this.state === 'hidden'){

      this.ifrm.style.visibility = 'visible';

      this.state = 'visible';
      this.title.innerHTML = this.fakeTitle;
      document.head.insertBefore(this.favicon, document.head.firstChild);

    }else{

      this.ifrm.style.visibility = 'hidden';

      this.state = 'hidden';
      this.title.innerHTML = this.originalTitle;
      document.head.insertBefore(this.originalFavicon, document.head.firstChild);

    }

  }
};


new panicButton();

