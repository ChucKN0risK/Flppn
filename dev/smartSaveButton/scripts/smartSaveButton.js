// smartSaveButton Class
// request background.js
// Methods : init / saveVideo / openSmartSaveMenu

var smartSaveButton = function(videoWrapper) {
  this.$wrapper = videoWrapper;
  secondSmartSaveButton.init(videoWrapper);
  console.log(videoWrapper);

  return smartSaveButton;
}

var secondSmartSaveButton = {
  saveVideo: function() {
    console.log('video saved');
  },
  openSmartSaveMenu: function() {
    smartSaveMenu.init();
  },
  init: function(videoWrapper) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('dev/smartSaveButton/smartSaveButton.html'), true);
    xhr.onload = function() {
        videoWrapper.innerHTML = this.responseText;
    };
    xhr.send();
  }
};