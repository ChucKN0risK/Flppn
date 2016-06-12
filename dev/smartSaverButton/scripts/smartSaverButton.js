// smartSaveButton Class
// request background.js
// Methods : init / saveVideo / openSmartSaveMenu

var smartSaveButton = function($el) {
  this.$el = $el;

  return smartSaveButton;
}

smartSaveButton.prototype = {
  saveVideo: function() {

  },
  openSmartSaveMenu: function() {
    smartSaveMenu.init();
  }
};