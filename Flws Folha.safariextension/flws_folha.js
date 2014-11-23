function remove_paywall(first_time, observer) {
	document.body.removeAttribute('style');
	var span = document.getElementsByTagName("span")[0];

	// se tem a span do paywall
	if (span && span.style && span.style.zIndex === "99999999999") {
		span.remove();
		observer.disconnect();
	}

	// desabilita o setTimeout na pagina, para evitar "travarem" o scroll
	if (first_time) {
		var script   = document.createElement("script");
		script.type  = "text/javascript";
		script.text  = "window.setTimeout = function() {};"
		document.body.appendChild(script);
	}
}

// We want to support dynamically added content so on every document change
// do a quick check of the URLs. This will also most likely kick it to action initially.

var observer = new WebKitMutationObserver(function(mutations) {
	var obs = this;
  	mutations.forEach(function(mutation) {
    	remove_paywall(false, obs);
  	});    
});


var config = { attributes: true, childList: true, characterData: true, subtree: true };
observer.observe(document.body, config);
remove_paywall(true, observer);