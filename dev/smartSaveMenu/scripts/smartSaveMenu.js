// smartSaveMenu Class
// request : smartSaveButton.js
// Methods : init / open / close / getCollections / createCollections / assignCollections

var menu, userCollections;
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
        this.$el.classList.add('is-open')
        this.isShown = true
    },
    close: function() {
        this.$el.classList.remove('is-open')
        this.isShown = false
        console.log('close')
    },
    getUserCollections: function() {
        var _this = this;
        if(Array.isArray(userCollections)){
          return;
        }
        getToken(function(err, token){

            if(err){
              return console.log('user_not_connected');
            }

            getCollections(token, function(err, result) {
                userCollections= result;
                var categoriesList = _this.$el.getElementsByTagName('ul')[0];
                for(var i = 0; i < result.length; i++){
                  console.log(result[i]);
                  categoriesList.appendChild(_this.constructCategories(result[i].title, result[i].videos, result[i].img));
                }
            })
        })
    },
    assignCollections: function() {
        console.log('assignCollections');
    },
    createCollections: function() {
        console.log('createCollections');
    },
    constructCategories: function(title, videos, img){
      var cat = document.createElement('li');
      cat.classList.add('smartSaveMenu-collection');
      var div = document.createElement('div');
      div.classList.add('collection-cover');
      console.log('img>>>>>>',div);
      div.style.backgroundImage = "url("+img+")";
      var div2 = document.createElement('div');
      div2.classList.add('collection-content');
      var p = document.createElement('p');
      p.classList.add('collection-name');
      var p2 = document.createElement('p');
      p2.classList.add('collection-infos');
      cat.appendChild(div);
      cat.appendChild(div2);
      div2.appendChild(p);
      p.appendChild(document.createTextNode(title));
      div2.appendChild(p2);
      p2.appendChild(document.createTextNode(videos+' videos'));
      return cat;
    }
}


var getToken = function(cb) {
        chrome.storage.sync.get('token', function(token) {

          if(token.token){
            return cb(null, token.token);
          }

          cb('user_not_connected');
        });
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
