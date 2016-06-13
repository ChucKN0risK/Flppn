// smartSaveButton Class
// request background.js
// Methods : init / saveVideo / openSmartSaveMenu

var token;

console.log(token);

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
  console.log(token);
});

var smartSaveButton = function(videoWrapper) {
  this.$wrapper = videoWrapper;
  SmartSaveButton.init(videoWrapper);
  console.log(videoWrapper);

  return smartSaveButton;
}

var SmartSaveButton = {
  saveVideo: function() {
    console.log('video saved');
  },
  openSmartSaveMenu: function() {
    smartSaveMenu.init();
  },
  showElement: function() {
    var host = document.querySelector('#smartSaveButtonHost').createShadowRoot();
    var template = document.querySelector('#smartSaveButtonTemplate');
    var clone = document.importNode(template.content, true)
    host.appendChild(clone);
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