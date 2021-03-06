// smartLogin Class
// request : smartLogin.js
// Methods : init / open / close / getCollections / createCollections / assignCollections

var smartLogin = function() {
    this.$host = smartLoginHost;
    this.$el = this.$host.shadowRoot.querySelector('#modalWrapper');
    this.$form = this.$el.querySelector('#smartLoginForm');
    this.$username = this.$el.querySelector('#smartLoginUsername');
    this.$password = this.$el.querySelector('#smartLoginPassword');
    this.$formSubmit = this.$el.querySelector('#smartLoginSubmit');
    this.$closeButton = this.$el.querySelector('.js-modal-close');
    this.$errorWrapper = this.$el.querySelector('#errorWrapper');
    this.isShown = false;
    this.events();
};

smartLogin.prototype = {
    events: function() {
        var _this = this;

        // Close smartSaveMenu if user clicks outside
        // document.addEventListener('click', function(e) {
        //   console.log(e);
        //   if (!(e.target).closest(_this.$el).length && _this.isOpened) _this.toggle();
        // });



        _this.$closeButton.addEventListener('click', function() {
            _this.close();
        });

        _this.$formSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            _this.login();
        });
    },
    toggle: function() {
        if (this.isShown) {
            this.close();
        } else {
            this.open();
        }
    },
    open: function() {
        this.$el.classList.add('is-active');
        this.isShown = true;
        this.$el.style.visibility = 'visible';
    },
    close: function() {
        this.$el.classList.remove('is-active');
        this.isShown = false;
        // console.log('close')
    },
    login: function() {
        var _this = this;

        var connectPseudo = _this.$username.value;
        var connectPassword = _this.$password.value;

        signin(connectPseudo, connectPassword, function(err, result) {
            if (err) {
                _this.$errorWrapper.style.opacity = '1';
                return console.log('error : ', err)
            }
            _this.close();
            smartSaveMenu.getUserCollections();
            smartSaveMenu.toggle();
        });
    }
};

// Here we get our smartSaveButton DOM from a file in the project 
// doing a xhr request.
var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('smartLogin/smartLogin.html'), true);
xhr.onload = function() {
    var smartLoginHook = document.createElement('div');
    smartLoginHook.style.zIndex = '958575959';
    smartLoginHook.style.position = 'fixed';
    smartLoginHook.style.top = '0';
    smartLoginHook.style.left = '0';
    smartLoginHook.innerHTML = this.responseText;
    document.body.appendChild(smartLoginHook);

    var smartLoginHost = document.querySelector('#smartLoginHost').createShadowRoot();
    var smartLoginTemplate = document.querySelector('#smartLoginTemplate');
    var clone = document.importNode(smartLoginTemplate.content, true)
    smartLoginHost.appendChild(clone);
    login = new smartLogin();
};
xhr.send();

