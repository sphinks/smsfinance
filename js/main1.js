var smsService = null;
var model;

//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log("init() called");

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });
    
    console.log("run");
    
    //model = new Model();
    
    $('#createRuleButton').click(function() {
    	tizen.messaging.getMessageServices("messaging.sms",
    	        serviceListCB,
    	        errorCallback);
    	loadSms(smsService);
    	console.log('clicked');
    });

    $('#refresh').click(function() {
//    	tizen.messaging.getMessageServices("messaging.sms",
//    	        serviceListCB,
//    	        errorCallback);
    	//loadSms();
    	console.log('clicked1');
    });
};
$(document).ready(init);


function setEvents() {
	console.log("run");
    
    //model = new Model();
	//app.model.init();
	model = app.model.smsService;
    
    $('#createRuleButton').click(function() {
//    	tizen.messaging.getMessageServices("messaging.sms",
//    	        serviceListCB,
//    	        errorCallback);
    	loadSms(model);
    	console.log('clicked');
    });

    $('#refresh').click(function() {
//    	tizen.messaging.getMessageServices("messaging.sms",
//    	        serviceListCB,
//    	        errorCallback);
    	//loadSms();
    	console.log('clicked1');
    });
}

var MyApp = {};

function serviceListCB(services) {

  smsService = services[0];
  
  /* Set the attribute filter */
  //var filter = new tizen.AttributeFilter("from");
      
  //console.log(smsService.messageStorage.findMessages(filter, messageSentCallback, errorCallback));
  
  //var filter = new tizen.AttributeFilter('isRead', 'EXACTLY', false);
  //MyApp.smsService.messageStorage.findConversations(filter, messageArrayCB);
  
}

// Define the error callback.
function errorCallback(err) {
  console.log(err.name + " error: " + err.message);
}
	
// Define success callback
function successCallback() {
  console.log("Messages were updated");
}

//Define success callback
function loadMessageBody(message) {
	console.log ("body for message: " + message.subject + "from: " + message.from + " loaded.");
  //console.log("Message body: " + message.body);
}

function messageArrayCB(messages) {
	console.log('Messages: ' + messages.length);
	loadListOfSms(messages);
 }

function loadListOfSms(messages) {
	
	for (var i = 0; i < messages.length; i++) {
		var message = messages[i];
		console.log ("body for message: " + message.subject + "from: " + message.from + " loaded.");
		console.log('Messages: ' + message.body.plainBody);
		liCode = '<li><a href="#"><p>From: ' + message.from + '<br>' +
        'Subject: ' + message.subject + '<br>' +
        message.body.plainBody + '</p></a></li>';
	    $('#messageList').append(liCode);
	}
	
	console.log($('#messageList').html());
	$('#messageList').listview('refresh')
}

/*function loadListOfDialogs(dialogs) {
	
	for (var i = 0; i < dialogs.length; i++) {
		message = dialogs[i];
		//console.log ("body for message: " + message.subject + "from: " + message.from + " loaded.");
		//console.log('Messages: ' + message.body.plainBody);
		//liCode = '<li><a href="#"><p>From: ' + message.from + '<br>' +
        //'Subject: ' + message.subject + '<br>' +
        //message.body.plainBody + '</p></a></li>';
	    //$('#messageList').append(liCode);
	}
	
	console.log($('#messageList').html());
	$('#messageList').listview('refresh')
}*/

function loadSms(smsService) {
	smsService.messageStorage.findMessages(
	          new tizen.AttributeFilter("type", "EXACTLY", "messaging.sms"),
	          messageArrayCB);
}

/*function loadDialogs() {
	MyApp.smsService.messageStorage.findConversations(
	          new tizen.AttributeFilter("type", "EXACTLY", "messaging.sms"),
	          messageArrayCB);
}*/