//When the extension is installed then the user is redirected on flppn.com
// chrome.runtime.onInstalled.addListener(function () {
//   chrome.tabs.create({"url": "http://flppn.com/register"})
// });

chrome.windows.onCreated.addListener(function(){
  chrome.storage.sync.clear();
});

chrome.browserAction.onClicked.addListener(function(){
  var properties = {
    url: "http://alpha.flppn.com"
  };
  chrome.tabs.create(properties);
});
