// smartSaveButton Class
// request background.js
// Methods : init / saveVideo / openSmartSaveMenu


chrome.storage.sync.get(function(localstorage) {
  token = localstorage.token;
  var videoWrapper = document.querySelector('#player');
  if (videoWrapper) {
    smartSaveButton(videoWrapper);
  }
});

chrome.storage.onChanged.addListener(function(changes) {
  // If the token stored in the localstorage has changed
  // then its new value is cached in our global token variable.
  token = changes.token;
});

var smartSaveButton = function(videoWrapper) {
  this.$wrapper = videoWrapper;
  SmartSaveButton.init(videoWrapper);
  SmartSaveButton.events();
  // smartSaveMenu.init();
  // this.events();

  return smartSaveButton;
}

var SmartSaveButton = {
  events: function() {
    console.log('events');
  },
  saveVideo: function() {
    console.log('video saved');
  },
  openSmartSaveMenu: function() {
    getToken(function(){ 
      smartSaveMenu.getUserCollections();
      smartSaveMenu.toggle();  
    })
  },
  showElement: function() {
    _this = this;
    var host = document.querySelector('#smartSaveButtonHost').createShadowRoot();
    var template = document.querySelector('#smartSaveButtonTemplate');
    var clone = document.importNode(template.content, true)
    host.appendChild(clone);

    var button = host.firstChild.nextSibling.nextSibling.nextSibling;
    button.addEventListener('click', function() {
      _this.openSmartSaveMenu();
    });

    return host;
  },
  init: function(videoWrapper) {
    // Here we get our smartSaveButton DOM from a file in the project 
    // doing a xhr request.
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('dev/smartSaveButton/smartSaveButton.html'), true);
    xhr.onload = function() {
        var z = document.createElement('div');
        z.style.zIndex = '858575959';
        z.style.position = 'absolute';
        z.innerHTML = this.responseText;
        videoWrapper.insertBefore(z, videoWrapper.firstChild);
        SmartSaveButton.showElement();
    };
    xhr.send();
  }
};