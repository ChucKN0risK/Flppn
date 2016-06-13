// When our extension button in the browser actions 
var connectForm = document.querySelector('#connectForm');

connectForm.addEventListener('click', function(e) {
  e.preventDefault();
  var connectPseudo = document.querySelector('#connectPseudo').value;
  var connectPassword = document.querySelector('#connectPassword').value;

  signin(connectPseudo, connectPassword, function(err, result) {
    if (err) {
      return console.log('error : ', err);
    }
    console.log('login ok');

    chrome.storage.sync.set({token: token});
  });
});

