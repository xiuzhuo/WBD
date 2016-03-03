document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('#go-to-blacklist').addEventListener('click', function(){
    chrome.runtime.sendMessage(
        'go-to-blacklist',
        function (response) {
            console.log(response);
        }
    );
  });

  document.querySelector('#go-to-options').addEventListener('click', function() {
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
