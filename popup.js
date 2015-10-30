document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('goblacklist').addEventListener('click', function(){
    chrome.extension.sendRequest({redirect: "http://www.dolc.de/home.php?mod=space&do=friend&view=blacklist"});
    window.close();
  });

  chrome.storage.sync.get('blacklist', function(item){
    var blacklist = item.blacklist;
    if (blacklist){
      for (var i = 0; i < blacklist.length; i++){
        var name = blacklist[i];
        $('#blacklist').append('<li>' + name + '</li>');
      }
    }
  });
});
