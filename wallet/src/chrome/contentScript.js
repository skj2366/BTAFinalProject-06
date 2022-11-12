chrome.runtime.sendMessage(
  {
    contentScriptQuery: "postData"
    , data: JSONdata
    , url: ApiUrl
  }, function (response) {
    debugger;
    if (response != undefined && response != "") {
      callback(response);
    }
    else {
      debugger;
      callback(null);
    }
  })
