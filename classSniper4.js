// capture n,t,r values for request to run
var n = "https://sa.ucla.edu/ro/ClassSearch/Results/GetCourseSummary"
var a = {"model":"{\"Term\":\"18F\",\"SubjectAreaCode\":\"PSYCH  \",\"CatalogNumber\":\"0100A   \",\"IsRoot\":true,\"SessionGroup\":\"%\",\"ClassNumber\":\"%\",\"SequenceNumber\":null,\"Path\":\"PSYCH0100A\",\"MultiListedClassFlag\":\"n\",\"Token\":\"MDEwMEEgICBQU1lDSDAxMDBB\"}","FilterFlags":"{\"enrollment_status\":\"O,W\",\"advanced\":\"y\",\"meet_days\":\"M,T,W,R,F\",\"start_time\":\"8:00 am\",\"end_time\":\"8:00 pm\",\"meet_locations\":null,\"meet_units\":null,\"instructor\":null,\"class_career\":null,\"impacted\":null,\"enrollment_restrictions\":null,\"enforced_requisites\":null,\"individual_studies\":null,\"summer_session\":null}"}
var t = JSON.stringify(a)
var r = {path: "PSYCH0100A", isExpandAll: undefined}

function processFunc(i) {
	var response = i.html;
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(response, "text/xml");

	// run through div elements on the response and look for status
	// set var 'final' to be the status
	var final;
	var divs = xmlDoc.getElementsByTagName("div"), item;
	for (var i = 0, len = divs.length; i < len; i++) {
	    item = divs[i];
	    if (item.id && item.id.indexOf("status_data") > -1) {
	        final = item;
	    }
	}

	// check if status contains 'Open'
	// modified to look for 18th seat to open, otherwise use 'Open' and 'Closed'
	if(final.innerHTML.indexOf('18 of') > -1) {
		alert("Class is open, GO GO GO!");		
	} else if(final.innerHTML.indexOf('17 of') > -1) {
		var d = new Date();
		console.log(d.toLocaleTimeString() + ': Still 17');
	}
	
}

function pingIt(){
	AjaxProvider.SendRequestWithContext(n, t, processFunc, r, null, null, null, null)
}

function startIt() {
	pingInterval = setInterval(pingIt, 100000);
}

function killIt() {
	clearInterval(pingInterval);
}

var pingInterval
startIt()

// run this to capture n,t,r values
// AjaxProvider.SendRequestWithContext = function(n,t,i,r,u,f,e,o){var h,c,s;
// console.log(n)
// console.log(t)
// console.log(r)
// e&&AjaxProvider.CurrentAjaxRequests[e]&&AjaxProvider.CurrentAjaxRequests[e].abort();h=null;c="";s=o?$.ajax({type:"POST",data:$.parseJSON(t),url:n,async:!0,cache:!1,beforeSend:u,success:function(n,t,u){var f,e;u.status==200&&(f=MakeClass(),f.prototype.init=function(n){this.response=u.getResponseHeader("content-type")==null?!1:!0;this.html=n;this.IsReset=$(n).filter("input[name=IsReset]").val();this.ErrorMsg=$(n).filter("input[name=Error]").val();this.crsDetailTitle=$(n).filter("input[name=crsDetailTitle]").val();this.selCrsNo=$(n).filter("input[name=selCrsNo]").val();this.IsReset=$(n).filter("input[name=IsReset]").val();this.ErrorMsg=$(n).filter("input[name=Error]").val();this.pageCount=$(n).filter("input[name=pageCount]").val();this.context=r},e=f(n),i(e))},complete:function(){e&&delete AjaxProvider.CurrentAjaxRequests[e];f&&f();AjaxProvider.NumAjaxRequestsRunning--},error:function(n,t,i){AjaxProvider.AjaxError(n,t,i)}}):$.ajax({type:"GET",data:$.parseJSON(t),url:n,async:!0,cache:!1,beforeSend:u,success:function(n,t,u){var f,e;u.status==200&&(f=MakeClass(),f.prototype.init=function(n){this.response=u.getResponseHeader("content-type")==null?!1:!0;this.html=n;this.IsReset=$(n).filter("input[name=IsReset]").val();this.ErrorMsg=$(n).filter("input[name=Error]").val();this.crsDetailTitle=$(n).filter("input[name=crsDetailTitle]").val();this.selCrsNo=$(n).filter("input[name=selCrsNo]").val();this.IsReset=$(n).filter("input[name=IsReset]").val();this.ErrorMsg=$(n).filter("input[name=Error]").val();this.pageCount=$(n).filter("input[name=pageCount]").val();this.context=r},e=f(n),i(e))},complete:function(){e&&delete AjaxProvider.CurrentAjaxRequests[e];f&&f();AjaxProvider.NumAjaxRequestsRunning--},error:function(n,t,i){AjaxProvider.AjaxError(n,t,i)}});e&&(AjaxProvider.CurrentAjaxRequests[e]=s);AjaxProvider.NumAjaxRequestsRunning++}