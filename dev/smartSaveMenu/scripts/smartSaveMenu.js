// smartSaveMenu Class
// request : smartSaveButton.js
// Methods : init / open / close / getCollections / createCollections / assignCollections

var smartSaveMenu = function() {
  this.$el = document.querySelector('#smartSaveMenu');
  this.$toggle = document.querySelector('#smartSaveButton');
  this.isShown = false;
  this.toggle();
  this.events();

  return smartSaveMenu;
};

smartSaveMenu.prototype = {
  events: function() {
    var _this = this;

    _this.$toggle.addEventListener('click', function() {
      _this.toggle()
    });

    // Close smartSaveMenu if user clicks outside
    document.addEventListener('click', function(e) {
      if (!(e.target).closest('#smartSaveButton').length && _this.isOpened) _this.toggle();
    });

    // Close smartSaveMenu when user hits ESC key
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
          _this.close()
          console.log('close w/ ESC')
      }
    };
  },
  toggle: function() {
    if (this.isShown) {
        this.close();
    } else {
        this.open();
    }
  },
  open: function() {
    this.classList.add('is-active')
    this.isShown = true
    console.log('open')
  },
  close: function() {
    this.classList.remove('is-active')
    this.isShown = false
    console.log('close')
  },
  getCollections: function() {
    console.log('getCollections');
  },
  assignCollections: function() {
    console.log('assignCollections');
  },
  createCollections: function() {
    console.log('createCollections');
  },
}


// Here we get our smartSaveButton DOM from a file in the project 
// doing a xhr request.
var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('dev/smartSaveMenu/smartSaveMenu.html'), true);
xhr.onload = function() {
    var smartSaveMenuHook = document.createElement('div');
    smartSaveMenuHook.style.zIndex = '858575959';
    smartSaveMenuHook.style.position = 'fixed';
    smartSaveMenuHook.style.right = '10px';
    smartSaveMenuHook.style.bottom = '10px';
    smartSaveMenuHook.innerHTML = this.responseText;
    document.body.appendChild(smartSaveMenuHook);

    var sSMhost = document.querySelector('#smartSaveMenuHost').createShadowRoot();
    var sSMtemplate = document.querySelector('#smartSaveMenuTemplate');
    var clone = document.importNode(sSMtemplate.content, true)
    sSMhost.appendChild(clone);
};
xhr.send();
