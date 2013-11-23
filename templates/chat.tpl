<div id="chat" data-role="page">
	<div id="chat-header" data-role="header" data-position="fixed">
		<h1 id="chat-title"></h1>
	</div>

	<div id="chat-content" data-role="content">
		<ul data-role="listview" id="message-chat"></ul>
	</div>

	<div id="chat-footer" data-role="footer" data-position="fixed">
		<div class="ui-textArea">
			<div class="ui-textArea-text">
				<textarea id="text" class="ui-textArea-text-text" placeholder="type new message" data-role="none"></textarea>
			</div>
			<div class="ui-textArea-button">
				<a data-role="button" id="send">Send</a>
				<div data-role="none" id="counter" class="counter"><p></p></div>
			</div>
		</div>
	</div>
</div>