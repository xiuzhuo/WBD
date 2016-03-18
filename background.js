console.log(chrome.tabs);
function updateTabs(){
  chrome.tabs.query({active: true}, function(tabs){
      tabs.forEach(function(tab){
        chrome.browserAction.disable(tab.id);
      });
      chrome.tabs.query({active: true, url: "*://www.dolc.de/*"}, function(tabs){
          tabs.forEach(function(tab){
            chrome.browserAction.enable(tab.id);
          });
      });
  });
}
if (chrome.tabs){

  try{
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
      switch (changeInfo.status){
        case "loading":
          if (tab.url.includes("www.dolc.de")){
            chrome.browserAction.enable(tab.id);
          }
          else{
            chrome.browserAction.disable(tab.id);
            chrome.browserAction.setBadgeText({text: ""});
          }
          break;
        case "complete":
          break;
      }
    })
  }catch(err){
    console.log(err);
  }

  try{
    chrome.tabs.onActivated.addListener(function(activeInfo){
      updateTabs();
    });
  }catch(err){
    console.log(err);
  }


  try{
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
                chrome.browserAction.enable(sender.tab.id);
                chrome.browserAction.setBadgeText({text: request, tabId: sender.tab.id});
                break;

            }
            sendResponse("bar");
        }
    );
  }catch(err){
    console.log(err);
  }
}
