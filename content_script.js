$.extend( $.expr[":"], {
 containsExact: $.expr.createPseudo ?
  $.expr.createPseudo(function(text) {
   return function(elem) {
    return $.trim(elem.innerHTML.toLowerCase()) === text.toLowerCase();
   };
  }) :
  // support: jQuery <1.8
  function(elem, i, match) {
   return $.trim(elem.innerHTML.toLowerCase()) === match[3].toLowerCase();
  },

 containsExactCase: $.expr.createPseudo ?
  $.expr.createPseudo(function(text) {
   return function(elem) {
    return $.trim(elem.innerHTML) === text;
   };
  }) :
  // support: jQuery <1.8
  function(elem, i, match) {
   return $.trim(elem.innerHTML) === match[3];
  },

 containsRegex: $.expr.createPseudo ?
  $.expr.createPseudo(function(text) {
   var reg = /^\/((?:\\\/|[^\/]) )\/([mig]{0,3})$/.exec(text);
   return function(elem) {
    return RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML));
   };
  }) :
  // support: jQuery <1.8
  function(elem, i, match) {
   var reg = /^\/((?:\\\/|[^\/]) )\/([mig]{0,3})$/.exec(match[3]);
   return RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML));
  }

});



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
      blacklist = chrome.storage.sync.get('blacklist', function(item){
        var blacklist = item.blacklist;
        // alert(blacklist);
        if (blacklist) {
          var blacklistQuery1 = [];
          var blacklistQuery2 = [];
          for (var i = 0; i < blacklist.length; i++){
            var name = blacklist[i];
            blacklistQuery1.push('tbody:has(td.by cite a:containsExact(' + name + '))');
            blacklistQuery2.push('div:has(>table>tbody>tr>td>div>div>div.authi a:containsExact(' + name + '))');
          }
          var blacklistQuery = jQuery.merge(blacklistQuery1, blacklistQuery2);
          $(blacklistQuery.join(',')).css('display','none');
        }
      });
  }
}

getStoredValue("enable", true, function(enable){
  filter(enable);
});
