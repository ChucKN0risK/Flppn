  var urlAPI = 'http://ec2-54-154-184-39.eu-west-1.compute.amazonaws.com:8080';
  // var urlAPI = 'http://localhost:3000';

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
      chrome.storage.sync.get(function(localStorage) {
        

          if (localStorage.id_token) {
              return cb(localStorage.id_token);
          }

          login.toggle();
      });
  };


  var getCollections = function(cb) {
      getToken(function(id_token) {

          var options = {
              token: id_token
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

          chrome.storage.sync.set({id_token: result.id_token});

          cb(null, result);
      })
  };


  var createCollectionRequest = function(title, cb) {
      getToken(function(id_token) {

          var options = {
              token: id_token,
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

      getToken(function(id_token) {

          var options = {
              token: id_token,
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
