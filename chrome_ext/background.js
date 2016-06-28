
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

var djs = "";

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        djs = "data:plain/javascript;base64," + b64EncodeUnicode(xhr.responseText);
    }
}
xhr.open('GET', 'd.js', true);
xhr.send(null);


chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
		if(details.url === "http://diep.io/d.js")
		{
			return {redirectUrl: djs};
		}
    }, 
    {
        urls : ["*://*.diep.io/*"]
    }, 
    ["blocking"]
);