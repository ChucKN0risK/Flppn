// smartSaveMenu Class
// request : smartSaveButton.js
// Methods : init / open / close / getCollections / createCollections / assignCollections

var smartSaveMenu = function() {
  this.$el = document.querySelector('#smartSaveMenu');
  this.$toggle = document.querySelector('#smartSaveButton');
  this.isShown = false;

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

// var Book = function($el) {
//     this.$el = $el;
//     this.$booksThumbsWrapper = $('.books-thumbs-wrapper');
//     this.$wrapper = $('.js-books-wrapper');
//     this.$toggler = this.$el.find('.js-book-toggler');
//     this.$slider = this.$el.find('.js-book-slider');
//     this.$title = this.$el.find('js-book-title');
//     this.isShown = false;
//     this.toggle();
//     this.events();

//     return Book;
// };

// Book.prototype = {
//     events: function() {
//         var _this = this;

//         $('.js-books-thumbs-toggler, .js-home-link').on('click', function() {
//             _this.close();
//             _this.$booksThumbsWrapper.removeClass('u-hide');
//         });
//     },
//     toggle: function() {
//         if (this.isShown) {
//             this.close();
//         } else {
//             this.open();
//         }
//     },
//     open: function(transition) {
//         $('body').addClass('book-selected');
//         this.$booksThumbsWrapper.addClass('u-hide');
//         this.$wrapper.removeClass('u-hide');
//         this.$el.siblings().addClass('u-hide');
//         this.$title.text('');
//         this.initSlider();
//         this.isShown = true;
//         console.log('open');
//     },
//     close: function(transition) {
//         $('body').removeClass('book-selected');
//         this.$booksThumbsWrapper.removeClass('u-hide');
//         this.$wrapper.addClass('u-hide');
//         this.$el.siblings().removeClass('u-hide');
//         $('.js-book-author').addClass('u-hide');
//         this.isShown = false;
//         console.log('close');
//     },
//     initSlider: function() {
//         this.$slider.glide({
//             type: "carousel",
//             hoverpause: "true",
//             keyboard: "true",
//             autoplay: "4000"
//         });
//     }
// };