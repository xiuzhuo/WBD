if (window.location.href.indexOf('view=blacklist') > -1){
  var blacklist = [];
  $('div#friend_ul>ul>li>h4>span+a').each(function(){
    blacklist.push($(this).text());
  });
  // alert(blacklist);
  chrome.storage.sync.set({'blacklist': blacklist}, function(){
    // alert(blacklist);
  });
} else {
    blacklist = chrome.storage.sync.get('blacklist', function(item){
      var blacklist = item.blacklist;
      // alert(blacklist);
      if (blacklist) {
        var blacklistQuery1 = [];
        var blacklistQuery2 = [];
        for (var i = 0; i < blacklist.length; i++){
          var name = blacklist[i];
          blacklistQuery1.push('tbody:has(td.by cite a:contains(' + name + '))');
          blacklistQuery2.push('div:has(>table>tbody>tr>td>div>div>div.authi a:contains(' + name + '))');
        }
        var blacklistQuery = jQuery.merge(blacklistQuery1, blacklistQuery2);
        $(blacklistQuery.join(',')).css('display','none');
      }
    });
}
