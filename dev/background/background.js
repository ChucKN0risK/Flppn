// This is the `click` function called when our extension
// button is clicked. 
function click(e) {
  console.log('background.js: click()');
}

// When our extension button in the browser actions 
// is clicked then the `click` function is called
chrome.browserAction.onClicked.addListener(click);