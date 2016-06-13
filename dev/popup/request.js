  var urlAPI = "http://api.flppn.com:8080";
  var token;
  var request = function (verb, url, options, cb) {

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
      if(xhr.status !== 200){

        return cb(JSON.parse(xhr.response));
      }

      cb(null, JSON.parse(xhr.response));
    };

    xhr.open(verb, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    if(options.token){
      xhr.setRequestHeader("Authorization", options.token);
    }
    xhr.send(JSON.stringify(options.data));
  };

  var getCollections = function (cb) {

    var options ={
      token:token
    };
    request("GET", urlAPI+"/collections", options, function (err, result) {

      if(err){
        return cb(err)
      }

      cb(null, result);
    })
  };

  var signin = function (pseudo, password, cb) {

    var options ={
      data:{
        "pseudo": pseudo,
        "password": password
      }
    };

    request("POST", urlAPI+"/signin", options, function (err, result) {
      if(err){
        return cb(err)
      }
      //TO DELETE
      token = result.token;


      cb(null, result);
    })
  };
  

  var createCollection = function(title, cb){

    var options ={
      token:token,
      data:{
        "title": title
      }
    };

    request("POST", urlAPI+"/collection", options, function (err, result) {

      if(err){
        return cb(err)
      }

      cb(null, result);
    })
  };

  var addVideo = function(url, cb){

    var options ={
      token:token,
      data:{
        "url": url
      }
    };

    request("POST", urlAPI+"/video", options, function (err, result) {

      if(err){
        return cb(err)
      }

      cb(null, result);
    })
  };