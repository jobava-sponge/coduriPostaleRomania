$(document).ready(function() {
	$("#btnSearch").click(function(e) {
		e.preventDefault();
		var zipcode = $("#codPostal").val();
		var url = 'http://openapi.ro/api/addresses.json';
		$.ajax({
			type: 'get',
			url: url,
			data: {zip : zipcode},
			success: function(obj) {
				var result = '';
				if(obj[0] != undefined) {
					$.each(obj, function(index, data) {
						result += (data.description != '' ? "<li>Stradă: " + (data.street_type != '' ? data.street_type + ' ' : '') + data.description + "</li>" : '');
						result += (data.sector != '' ? '<li>Sector: ' + data.sector + '</li>' : '');
						result += "<li>Localitate: " + data.location + "</li>";
						result += "<li>Județ: " + data.county + "</li>";
						result += "<li>&nbsp;</li>";
					});
				} else {
					result += '<li>Nu am gasit nimic</li>';
				}
				$("#searchResults").empty().append(result);
				$('#searchResults').listview('refresh');
			},
			dataType: 'jsonp'
		});
	});
});
