console.log('style test');

var styleSmartSaveButton = chrome.extension.getURL('dev/smartSaveButton/styles/main.css');
// var styleSmartSaveMe = chrome.extension.getURL('dev/smartSaveButton/styles/main.css');
// var styleSmartSaveButton = chrome.extension.getURL('dev/smartSaveButton/styles/main.css');

document.querySelector('#smartSaveButtonTemplateLink').href = styleSmartSaveButton;