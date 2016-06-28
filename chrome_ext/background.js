// true - load from online source
// false - load from local source
var path = false;

// location of script, url if path == true, or file path if path == false
var loc = "d.js";

// stores generated data URI for local script when path == false
var djs = "";

// for local file - encodes as data URI base64
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

// generates data URI if path == false
if(!path) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			djs = "data:plain/javascript;base64," + b64EncodeUnicode(xhr.responseText);
		}
	}	
	xhr.open('GET', loc, true);
	xhr.send(null);
}

// redirector
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
		if(details.url === "http://diep.io/d.js")
		{
			return {redirectUrl: path ? loc : djs};
		}
    }, 
    {
        urls : ["*://*.diep.io/*"]
    }, 
    ["blocking"]
);
