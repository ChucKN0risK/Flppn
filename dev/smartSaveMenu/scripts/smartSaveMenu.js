// smartSaveMenu Class
// request : smartSaveButton.js
// Methods : init / open / close / getCollections / createCollections / assignCollections

var menu, userCollections;
var smartSaveMenu = function() {
    this.$host = smartSaveMenuHost;
    this.$el = this.$host.shadowRoot.querySelector("#smartSaveMenu");
    this.isShown = false;
    this.events();
};

smartSaveMenu.prototype = {
    events: function() {
        var _this = this;

        console.log(_this)
        console.log(_this.$el)
         
        // _this.$host.shadowRoot.querySelector('#createCollectionText').onkeypress = function(evt){
        //     evt = evt || window.event;
        //     if (evt.keyCode == 13) {
        //       console.log(_this.createCollectionInput.value);
        //     }
        // }
        // _this.$toggle.addEventListener('click', function() {
        //     _this.toggle()
        // });

        // Close smartSaveMenu if user clicks outside
        // document.addEventListener('click', function(e) {
        //   console.log(e);
        //   if (!(e.target).closest(_this.$el).length && _this.isOpened) _this.toggle();
        // });


        // Close smartSaveMenu when user hits ESC key
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27 && _this.isShown) {
                _this.close()
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
        if (Array.isArray(userCollections)) {
            return;
        }
        getCollections(function(err, result) {
            userCollections = result;
            var categoriesList = _this.$el.getElementsByTagName('ul')[0];
            for (var i = 0; i < result.length; i++) {
                categoriesList.appendChild(_this.constructCategories(result[i].title, result[i].videoNumber, result[i].img));
            }
        })
    },
    assignCollections: function() {
        console.log('assignCollections');
    },
    createCollections: function() {
        console.log('createCollections');
    },
    constructCategories: function(title, videos, img) {
        var cat = document.createElement('li');
        cat.classList.add('smartSaveMenu-collection');
        var div = document.createElement('div');
        div.classList.add('collection-cover');
        div.style.backgroundImage = "url(" + img + ")";
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
        p2.appendChild(document.createTextNode(videos + ' videos'));
        return cat;
    }
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

    var smartSaveMenuHost = document.querySelector('#smartSaveMenuHost').createShadowRoot();
    var smartSaveMenuTemplate = document.querySelector('#smartSaveMenuTemplate');
    var clone = document.importNode(smartSaveMenuTemplate.content, true)
    smartSaveMenuHost.appendChild(clone);
    smartSaveMenu = new smartSaveMenu();
};
xhr.send();
