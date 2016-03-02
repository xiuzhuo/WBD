function getElementByXpath(xpathExpression, contextNode) {
  return document.evaluate(xpathExpression, contextNode, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
}

function filter(enable){
  if (window.location.href.indexOf('view=blacklist') > -1){
    var blacklist = [];
    $('div#friend_ul>ul>li>h4>span+a').each(function(){
      blacklist.push($(this).text());
    });
    // alert(blacklist);
    chrome.storage.sync.set({'blacklist': blacklist}, function(){
      // alert(blacklist);
    });
  } else if (enable) {
    chrome.storage.sync.get('blacklist', function(item){
        var blacklist = item.blacklist;
        if (blacklist) {
          var selectText = 'text()="' + blacklist.join('" or text()="')+ '"';
          console.log(selectText);
          var tableNode = document.querySelector('#threadlisttableid');
          var result = getElementByXpath('./tbody//a[' + selectText + ']/../../../..', tableNode);
          var r = result.iterateNext();
          var toRemoveNodes = [];
          while(r){
            console.log(r);
            toRemoveNodes.push(r);
            r = result.iterateNext();
          }
          console.log(toRemoveNodes.length);
          for (var i = 0; i<toRemoveNodes.length; i++){
            tableNode.removeChild(toRemoveNodes[i]);
          }
        }
      });
  }
}

getStoredValue("enable", true, function(enable){
  filter(enable);
});
