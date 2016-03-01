document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('go-to-blacklist').addEventListener('click', function(){
    chrome.runtime.sendMessage(
        'go-to-blacklist',
        function (response) {
            console.log(response);
        }
    );
    //chrome.extension.sendRequest({redirect: "http://www.dolc.de/home.php?mod=space&do=friend&view=blacklist"});

  });

  document.getElementById('go-to-options').addEventListener('click', function() {
    chrome.runtime.sendMessage(
        'go-to-options',
        function (response) {
            console.log(response);
        }
    );
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
