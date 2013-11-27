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

    $("#btnSearchZipcode").click(function(e) {
        e.preventDefault();
        var location = $("#location").val();
        var description = $("#address").val();
        var url = 'http://openapi.ro/api/addresses.json';
        $.ajax({
            type: 'get',
            url: url,
            data: {description: description, location: location},
            success: function(obj) {
                var result = '';
                if(obj[0] != undefined) {
                    $.each(obj, function(index, data) {
                        result += "<li>Cod Postal: " + data.zip + "</li>";
                        result += "<li>Stradă: " + (data.street_type != '' ? data.street_type + ' ' : '') + data.description + "</li>";
                        result += (data.sector != '' ? '<li>Sector: ' + data.sector + '</li>' : '');
                        result += "<li>Localitate: " + data.location + "</li>";
                        result += "<li>Județ: " + data.county + "</li>";
                        result += "<li class='borderBottom'>&nbsp;</li>";
                    });
                } else {
                    result += '<li>Nu am gasit nimic</li>';
                }
                $("#searchResultsAddress").empty().append(result);
                $('#searchResultsAddress').listview('refresh');
            },
            dataType: 'jsonp'
        });
    });

    $('#zipcodeTab').click(function(e){
        e.preventDefault();
        $('#zipcodeContainer').show();
        $('#addressContainer').hide();
    });
    $('#addressTab').click(function(e){
        e.preventDefault();
        $('#zipcodeContainer').hide();
        $('#addressContainer').show();
    });
});
