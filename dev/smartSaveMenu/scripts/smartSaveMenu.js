// smartSaveMenu Class
// request : smartSaveButton.js
// Methods : init / open / close / getCollections / createCollections / assignCollections

var userCollections, focus;
var smartSaveMenu = function () {
  this.$host = smartSaveMenuHost;
  this.$el = this.$host.shadowRoot.querySelector("#smartSaveMenu");
  this.createCollectionInput = this.$el.querySelector('#createCollectionText');
  this.categoriesList = this.$el.getElementsByTagName('ul')[0];
  this.isShown = false;
  this.events();
};

smartSaveMenu.prototype = {
  events: function () {
    var _this = this;

    _this.createCollectionInput.onkeypress = function (evt) {
      _this.createCollection(evt);
    };


    var elm = _this.$el.querySelector('.website-favicon');
    elm.style.backgroundImage = "url(" + getFavicon() + ")";
    // Close smartSaveMenu if user clicks outside
    document.body.addEventListener('click', function(e) {
      if(_this.isShown){
        _this.toggle();
      }
    });

    this.$el.onclick = function(e){
      e.preventDefault();
      e.stopPropagation();
    };

    _this.createCollectionInput.onfocus = function (e) {
      e.preventDefault();
      focus = true;
    };

    _this.createCollectionInput.onblur = function(){
      focus = false;
    };

    // Close smartSaveMenu when user hits ESC key
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27 && _this.isShown) {
        _this.close()
      }
    };
  },
  toggle: function () {
    if (this.isShown) {
      this.close();
    } else {
      this.open();
    }
  },
  open: function () {
    this.$el.classList.add('is-open');
    this.isShown = true
  },
  close: function () {
    this.$el.classList.remove('is-open');
    this.isShown = false
  },
  getUserCollections: function () {
    var _this = this;
    if (Array.isArray(userCollections)) {
      return;
    }
    getCollections(function (err, result) {
      userCollections = result;
      for (var i = 0; i < result.length; i++) {
        _this.categoriesList.appendChild(_this.constructCategories(result[i]));
      }
    })
  },
  assignCollections: function () {
    console.log('assignCollections');
  },
  createCollection: function (evt) {

    var _this = this;
    evt = evt || window.event;
    if (evt.keyCode == 13) {

      evt.preventDefault();

      createCollectionRequest(_this.createCollectionInput.value, function (err, result) {

        if (err) {
          return console.log('errrrror', err);
        }

        result.success.numberVideo = result.success.videos.length;
        userCollections.push(result.success);
        _this.createCollectionInput.value = '';

        _this.saveVideo(result.success._id, function(video){

          result.success.videoNumber = 1;
          result.success.img = video.default_thumb;
          _this.categoriesList.appendChild(_this.constructCategories(result.success));
        });
      })
    }
  },
  saveVideo: function (e, cb) {

    var collectionID = (typeof e === 'string') ? e : e.currentTarget.dataset.collectionid;
    smartSaveMenu.toggle();

    addVideoRequest(window.location.href, collectionID, function (err, result) {
      if (err) {
        return console.log('error save video', err);
      }

      if(cb){
        cb(result);
      }
    })
  },
  constructCategories: function (collection) {
    var cat = document.createElement('li');
    cat.classList.add('smartSaveMenu-collection');
    cat.setAttribute('data-collectionID', collection._id);
    var div = document.createElement('div');
    div.classList.add('collection-cover');
    div.style.backgroundImage = "url(" + collection.img + ")";
    var div2 = document.createElement('div');
    div2.classList.add('collection-content');
    var p = document.createElement('p');
    p.classList.add('collection-name');
    var p2 = document.createElement('p');
    p2.classList.add('collection-infos');
    cat.appendChild(div);
    cat.appendChild(div2);
    div2.appendChild(p);
    if(collection.title === 'unClassified'){
      collection.title = 'My Video';
    }
    p.appendChild(document.createTextNode(collection.title));
    div2.appendChild(p2);
    p2.appendChild(document.createTextNode(collection.videoNumber + ' videos'));
    cat.addEventListener('click', this.saveVideo);
    return cat;
  }
};

var getFavicon = function () {
  var favicon = undefined;
  var nodeList = document.getElementsByTagName("link");
  for (var i = 0; i < nodeList.length; i++) {
    if ((nodeList[i].getAttribute("rel") == "icon") || (nodeList[i].getAttribute("rel") == "shortcut icon")) {
      favicon = nodeList[i].getAttribute("href");
    }
  }
  return favicon;
};


// Here we get our smartSaveButton DOM from a file in the project 
// doing a xhr request.
var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('dev/smartSaveMenu/smartSaveMenu.html'), true);
xhr.onload = function () {
  var smartSaveMenuHook = document.createElement('div');
  smartSaveMenuHook.style.zIndex = '858575959';
  smartSaveMenuHook.style.position = 'fixed';
  smartSaveMenuHook.style.right = '10px';
  smartSaveMenuHook.style.bottom = '10px';
  smartSaveMenuHook.innerHTML = this.responseText;
  document.body.appendChild(smartSaveMenuHook);

  var smartSaveMenuHost = document.querySelector('#smartSaveMenuHost').createShadowRoot();
  var smartSaveMenuTemplate = document.querySelector('#smartSaveMenuTemplate');
  var clone = document.importNode(smartSaveMenuTemplate.content, true)
  smartSaveMenuHost.appendChild(clone);
  smartSaveMenu = new smartSaveMenu();
};
xhr.send();
