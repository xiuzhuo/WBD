function updateTabs(){
  chrome.tabs.query({active: true, url: "*://www.dolc.de/*"}, function(tabs){
      tabs.forEach(function(tab){
        chrome.pageAction.show(tab.id);
      });
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (changeInfo.status === "complete"){
    updateTabs();
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo){
  updateTabs();
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("background.js got a message")
        console.log(request);
        console.log(sender);
        switch (request) {
          case 'go-to-blacklist':
            chrome.tabs.update({url: 'http://www.dolc.de/home.php?mod=space&do=friend&view=blacklist'});
            break;
          case 'go-to-options':
            if (chrome.runtime.openOptionsPage) {
              chrome.runtime.openOptionsPage(); // New way to open options pages, if supported (Chrome 42+).
            } else {
              window.open(chrome.runtime.getURL('options.html'));  // Reasonable fallback.
            }
            break;
          default:

        }
        sendResponse("bar");
    }
);
