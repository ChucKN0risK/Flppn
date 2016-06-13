// smartSaveMenu Class
// request : smartSaveButton.js
// Methods : init / open / close / getCollections / createCollections / assignCollections

var menu;
var smartSaveMenu = function(elm) {
  this.$el = elm.firstChild.nextSibling.nextSibling.nextSibling;
  this.$toggle = elm;
  this.isShown = false;
  this.events();
};

smartSaveMenu.prototype = {
  events: function() {
    var _this = this;

    _this.$toggle.addEventListener('click', function() {
      _this.toggle()
    });

    // Close smartSaveMenu if user clicks outside
    // document.addEventListener('click', function(e) {
    //   console.log(e);
    //   if (!(e.target).closest(_this.$el).length && _this.isOpened) _this.toggle();
    // });

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
    console.log('this', this.$el);
    this.$el.classList.add('is-open')
    this.isShown = true
    console.log('open')
  },
  close: function() {
    this.$el.classList.remove('is-open')
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
    menu = new smartSaveMenu(sSMhost);
};
xhr.send();
