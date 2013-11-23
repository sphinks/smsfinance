<div id="contactSelect" data-role="page">
	<div id="contactSelect-header" data-role="header" data-position="fixed">
		<h1>Select contact</h1>
	</div>

	<div data-role="content">
		<ul data-role="listview" id="contactSelect-list"></ul>
		<a href="#" id="enterNumber" data-role="button">Enter number</a>
	</div>
	

	<div data-role="popup" id="enterNumber-popup">
		<h3>Enter phone number</h3>
		<p>
			<center>
				<input type="tel" id="number" name="number" maxlength="20"/>
			</center>
		</p>
		<div data-role="tabbar" data-style="toolbar">
			<ul>
				<li><a href="#" id="enterNumberCreate" class="ui-disabled">Create chat</a></li>
			</ul>
		</div>
	</div>
</div>
