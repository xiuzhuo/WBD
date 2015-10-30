function getDomainFromUrl(url){
  var host = null;
  if (typeof url == "undefined" || null == url){
    url = window.location.href;
  }
  var regex = /.*\:\/\/([^\/]*).*/;
  var match = url.match(regex);
  if(typeof match != "undefined" && null != match){
    host = match[1];
  }
  return host;
}

function checkForValidUrl(tabId, changeInfo, tab){
  if(getDomainFromUrl(tab.url).toLowerCase() == "www.dolc.de"){
    chrome.pageAction.show(tabId);
  }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.extension.onRequest.addListener(function(request, sender, sendRequest) {
  chrome.tabs.query(
    {active: true,
     windowType: "normal",
     currentWindow: true},
    function(tabs){
      chrome.tabs.update(tabs[0].id, {url: request.redirect});
    });
});

getStoredValue("enable", true, function(enable){
  // alert(enable);
  chrome.contextMenus.create({
    type: "checkbox",
    title: "Enable",
    id: "enable",
    contexts: ["all"],
    checked: enable,
    onclick: function(info){
      setStoredValue("enable", info.checked);
    }
  }, function(){

  });
});
