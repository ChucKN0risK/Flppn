  var urlAPI = 'http://ec2-54-154-225-53.eu-west-1.compute.amazonaws.com:8080';

  var request = function(verb, url, options, cb) {

      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
          if (xhr.status !== 200) {

              return cb(JSON.parse(xhr.response));
          }

          cb(null, JSON.parse(xhr.response));
      };

      xhr.open(verb, url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      if (options.token) {
          xhr.setRequestHeader("Authorization", options.token);
      }
      xhr.send(JSON.stringify(options.data));
  };

  var getToken = function(cb) {
      chrome.storage.sync.get('token', function(token) {

          if (token.token) {
              return cb(token.token);
          }

          login.toggle();
      });
  };


  var getCollections = function(cb) {
      getToken(function(token) {
          var options = {
              token: token
          };

          request("GET", urlAPI + "/collections", options, function(err, result) {

              if (err) {
                  return cb(err)
              }

              cb(null, result);
          })
      })
  };

  var signin = function(pseudo, password, cb) {

      var options = {
          data: {
              "pseudo": pseudo,
              "password": password
          }
      };

      request("POST", urlAPI + "/signin", options, function(err, result) {

          if (err) {
              return cb(err)
          }

          chrome.storage.sync.set({token: result.token});

          cb(null, result);
      })
  };


  var createCollectionRequest = function(title, cb) {
      getToken(function(token) {

          var options = {
              token: token,
              data: {
                  "title": title
              }
          };

          request("POST", urlAPI + "/collection", options, function(err, result) {

              if (err) {
                  return cb(err)
              }
              
              cb(null, result);
          })
      })
  };

  var addVideoRequest = function(url, collectionID, cb) {

      getToken(function(token) {

          var options = {
              token: token,
              data: {
                  "url": url
              }
          };

          if (collectionID) {
              options.data.collection = collectionID;
          }

          request("POST", urlAPI + "/video", options, function (err, result) {

              if (err) {
                  return cb(err)
              }

              cb(null, result);
          })
      })
  };
