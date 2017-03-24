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
app.filter('startFrom', function() {
    return function(data, start) {
        return data.slice(start);
    }
});