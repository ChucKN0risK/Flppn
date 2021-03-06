// smartSaveButton Class
// request background.js
// Methods : init / saveVideo / openSmartSaveMenu


chrome.storage.sync.get(function(localstorage) {
  token = localstorage.id_token;
  var videoWrapper = document.querySelector('#player') || document.querySelector('#videoWrapper')
  if (videoWrapper) {
    smartSaveButton(videoWrapper);
  }
});

chrome.storage.onChanged.addListener(function(changes) {
  // If the token stored in the localstorage has changed
  // then its new value is cached in our global token variable.
  token = changes.id_token;
});

var smartSaveButton = function(videoWrapper) {
  this.$wrapper = videoWrapper;
  SmartSaveButton.init(videoWrapper);
  SmartSaveButton.events();
  // smartSaveMenu.init();
  // this.events();

  return smartSaveButton;
};

var SmartSaveButton = {
  events: function() {

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
    var clone = document.importNode(template.content, true);
    host.appendChild(clone);

    var button = host.querySelector('button');
    button.addEventListener('click', function(e) {
      _this.openSmartSaveMenu();
    });


    return host;
  },
  init: function(videoWrapper) {
    // Here we get our smartSaveButton DOM from a file in the project 
    // doing a xhr request.
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('smartSaveButton/smartSaveButton.html'), true);
    xhr.onload = function() {
        var z = document.createElement('div');
        z.style.zIndex = '858575959';
        z.style.position = 'absolute';
        z.style.top = '10px';
        z.style.left = '10px';
        z.innerHTML = this.responseText;
        videoWrapper.insertBefore(z, videoWrapper.firstChild);
        SmartSaveButton.showElement();
    };
    xhr.send();
  }
};