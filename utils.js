function getStoredValue(key, defaultValue, callback){
  chrome.storage.sync.get(key, function(item){
    if (item !== undefined && item !== null && item[key] !=undefined){
      callback(item[key]);
    } else {
      callback(defaultValue);
    }
  })
}

function setStoredValue(key, value, callback){
  chrome.storage.sync.set({key: value}, callback);
}
