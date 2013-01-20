/**
* HTML5 History Demo
* @author Khaled Garbaya (http://khaledgarbaya.net)
* this example code is opensrouce , you may use it in your project 
* and change it if you want
**/
(function(){

var s,//setting global
	//HistoryDemo Object
 	HistoryDemo = {
 		//settings for the specific example
		settings:{
			hrefs:document.getElementsByClassName('nav-item'),// a tag 
			version:"0.1"//version
		},
		//init the script
		//attach click events to the nav items
		//catch the windows popstate event ( when the user clicks prev or next button on the browser)
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
		//attach click events to the nav items
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
		//load the requested page and display it
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
	// expose HistoryDemo to the global scope
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


