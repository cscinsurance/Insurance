//-----check status and return  string value-----
app.filter('status', function() {
	return function(input){
		if(input===true){
			return 'Confirmed ';
		}else {
			return 'Not Confirmed';
		}
	}
});
