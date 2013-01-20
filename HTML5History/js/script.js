
(function(){
var s,
 	HistoryDemo = {
		settings:{
			hrefs:document.getElementsByClassName('nav-item'),
			version:"0.1"
		},
		init:function(){			
			s = HistoryDemo.settings;
			for (var i = 0; i < s.hrefs.length; i++) {
				HistoryDemo.initClickListener(s.hrefs[i]);
			};
			window.addEventListener("popstate", function(e) {
				e.preventDefault;
			    HistoryDemo.swapPage(location.pathname);
			    return false;
			});
		},
		initClickListener:function(linkTag){
			console.log(linkTag.href);
			linkTag.onclick = function(e) {
				e.preventDefault();
			    //swap the page 
			    HistoryDemo.swapPage(linkTag.href);
			    
			    //push the state to the history
			    history.pushState(null, null, linkTag.href);
			    
			    //prevent default event behavior in this case refreshing the page
			    return false;
			};
		},
		swapPage:function(href){
			var req = new XMLHttpRequest();
			req.open("GET",
			         href.split("/").pop(),
			           false);
			req.send(null);
			if (req.status == 200) {
				//console.log(req.responseText);
				//when I comment this line the page does not refresh 
				document.getElementById("wrapper").innerHTML = req.responseText;
				HistoryDemo.init();
			    return true;
			  }
			  return false;
			}
	};
	window.HistoryDemo = HistoryDemo;
})();
window.onload = function(){
	if (Modernizr.history) {
	        // history is supported; do magical things
	        HistoryDemo.init();
	    } else {
	        // history is not supported; nothing fancy here
	        alert("Go Get a Real Browser !");
	    }	
}


