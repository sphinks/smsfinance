//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log("init() called");

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });
    
//    var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/compose", null, null, null,
//            [new tizen.ApplicationControlData("http://tizen.org/appcontrol/data/to", ["+7894"])]);
//
//    tizen.application.launchAppControl(
//             appControl,
//             "tizen.smsmessages",
//             function() {console.log("launch application control succeed"); },
//             function(e) {console.log("launch application control failed. reason: " + e.message); },
//             null );
    console.log("run");

    $('#chooseSmsThread').load(function() {
    	//tizen.messaging.getMessageServices("messaging.sms",
    	//        serviceListCB,
    	//        errorCallback);
    	console.log('loaded');
    });
    
    $( "#messageList" ).bind( "load", function() {
    	console.log('loaded1');
    	});
    
};
$(document).ready(init);

var MyApp = {};

var smsService;
//Define the success callback.
var messageSentCallback = function(recipients) {
  console.log("Message sent successfully to " + recipients.length + " recipients.");
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
	//console.log('Messages: ' + messages[0]);
	loadListOfSms(messages)
	/*for (i = 0; i < messages.length; i++) {
		message = messages[i];
		console.log ("body for message: " + message.subject + "from: " + message.from + " loaded.");
		console.log('Messages: ' + message.body.plainBody);
		
		
		
	}*/
 }

function loadListOfSms(messages) {
	
	for (i = 0; i < messages.length; i++) {
		message = messages[i];
		console.log ("body for message: " + message.subject + "from: " + message.from + " loaded.");
		console.log('Messages: ' + message.body.plainBody);
		liCode = '<li><a href="#"><p>From: ' + message.from + '</p>' +
        '<p>Subject: ' + message.subject + '</p>' +
        '<p>' + message.body.plainBody + '</p></a></li>';
	    $('#messageList').append(liCode);
	}
	
	
	
}

function serviceListCB(services) {

  MyApp.smsService = services[0];
  /* Set the attribute filter */
  var filter = new tizen.AttributeFilter("from");
      
  //console.log(smsService.messageStorage.findMessages(filter, messageSentCallback, errorCallback));
  
  //var filter = new tizen.AttributeFilter('isRead', 'EXACTLY', false);
  //MyApp.smsService.messageStorage.findConversations(filter, messageArrayCB);
  MyApp.smsService.messageStorage.findMessages(
          new tizen.AttributeFilter("type", "EXACTLY", "messaging.sms"),
          messageArrayCB);
}
	


