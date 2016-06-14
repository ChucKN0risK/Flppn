// smartLogin Class
// request : smartLogin.js
// Methods : init / open / close / getCollections / createCollections / assignCollections

var smartLogin = function(elm) {
    this.$el = elm.firstChild.nextSibling.nextSibling.nextSibling;
    this.$form = elm.firstChild.nextSibling.nextSibling.nextSibling;
    this.$toggle = elm;
    this.isShown = false;
    this.events();

    this.errorLabels: {
        'default': 'Votre identifiant ou mot de passe est erroné.'
    }
};

smartLogin.prototype = {
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
    login: function(username, password) {
            var self = this;
            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data:  {
                    'action': 'login_user',
                    'log': username,
                    'pwd': password
                },
                success: function(result) {
                    var result = JSON.parse(result);
                    console.log(result.success);
                    if (result.success) {
                        window.location.replace(main_VAR.site_url + '/profil/' + result.user_id);

                    } else {
                        self.showConnectionError(result.error);
                    }
                }
            });
    },
    showConnectionError: function(errorText) {
        errorText = errorText || 'default';

        var errorText = typeof this.errorLabels[errorText] != 'undefined'? this.errorLabels[errorText]: this.errorLabels['default'];
        this.$connectionError = this.$el.find('.error');
        this.$connectionError.html(errorText);
        this.$connectionError
            .hide(0) // @#velocity animation
            .fadeIn(300);
    },
    hideConnectionError: function() {
        if (this.$connectionError !== null) {
            var self = this;
            this.$connectionError
                .fadeOut(300);
        }
    }
    init: function() {
            this.$el = this.$('.modal--login');
            this.$form = this.$('form.modal__form');
            this.events();
        },
        $: function (selector) {
            return this.$elWrapper.find(selector);
        },
        events: function() {
            var self = this;
            this.$el.on('click', '.js-modal-close', function() {
                self.close();
            });

            this.$el.on('click', 'button.submit', function(e) {

                e.preventDefault();
                self.hideConnectionError();

                var username = self.$el.find('input[name="username"]').val(),
                    password = self.$el.find('input[name="password"]').val();

                if (username == '' || password == '') {
                    self.showConnectionError('Veuillez saisir un identifiant et un mot de passe');
                } else {
                    self.login(username, password);
                }
            });
        },
        open: function() {
            $('html').addClass('u-no-scroll');
            this.$elWrapper.addClass('is-active');
            this.$el.removeClass('u-hide');
            this.isOpened = true;
        },
        close: function() {
            $('html').removeClass('u-no-scroll');
            this.$elWrapper.removeClass('is-active');
            this.$el.addClass('u-hide');
            this.isOpened = false;
        },
        login: function(username, password) {
            var self = this;
            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data:  {
                    'action': 'login_user',
                    'log': username,
                    'pwd': password
                },
                success: function(result) {
                    var result = JSON.parse(result);
                    console.log(result.success);
                    if (result.success) {
                        window.location.replace(main_VAR.site_url + '/profil/' + result.user_id);

                    } else {
                        self.showConnectionError(result.error);
                    }
                }
            });
        },
        showConnectionError: function(errorText) {

            errorText = errorText || 'default';

            var errorText = typeof this.errorLabels[errorText] != 'undefined'? this.errorLabels[errorText]: this.errorLabels['default'];
            this.$connectionError = this.$el.find('.error');
            this.$connectionError.html(errorText);
            this.$connectionError
                .hide(0) // @#velocity animation
                .fadeIn(300);

        },
        hideConnectionError: function() {
            if (this.$connectionError !== null) {
                var self = this;
                this.$connectionError
                    .fadeOut(300);
            }
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

