function getElementByXpath(xpathExpression, contextNode) {
  return document.evaluate(xpathExpression, contextNode, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
}

function filter(){
  if (window.location.href.indexOf('view=blacklist') > -1){
    console.log("blacklist");
    var blacklist = [];
    var result = getElementByXpath('.//li/h4/a', document.querySelector('#friend_ul'));
    var r = result.iterateNext();
    while(r){
      blacklist.push(r.innerHTML);
      r = result.iterateNext();
    }
    //console.log(blacklist);
    chrome.storage.sync.set({'blacklist': blacklist}, function(){
    });
  } else {
    chrome.storage.sync.get('blacklist', function(item){
        var blacklist = item.blacklist;
        if (blacklist) {
          var selectText = 'text()="' + blacklist.join('" or text()="')+ '"';
          console.log(selectText);
          var tableNode = document.querySelector('#threadlisttableid');
          var result = getElementByXpath('./tbody//a[' + selectText + ']/../../../..', tableNode);
          var toRemoveNodes = [];
          var r = result.iterateNext();
          while(r){
            console.log(r);
            toRemoveNodes.push(r);
            r = result.iterateNext();
          }
          console.log(toRemoveNodes.length);
          chrome.runtime.sendMessage(
            toRemoveNodes.length.toString(),
            function (response) {
                console.log(response);
            }
          );
          for (var i = 0; i<toRemoveNodes.length; i++){
            tableNode.removeChild(toRemoveNodes[i]);
          }
        }
      });
  }
}

filter();
