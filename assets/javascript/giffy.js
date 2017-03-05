$(document).ready(function() {
	var gifSubjects = ["Broccoli", "Pizza", "Rice", 
						"Butter", "Almonds", "Walnuts", 
						"Sunflower Seeds", "Eggs",
					 	"Bread", "Hummus", "Avocodos",
						"Guacomole", "Tortilla Chips" ];
			
	function makeButtons(){
		$('#gif-buttons').empty();

		for (var i = 0; i<gifSubjects.length; i++){
			var a = $("<button>");
			a.addClass("gif");
			a.attr("data-name", gifSubjects[i]);
			a.html(gifSubjects[i]);
			a.val(gifSubjects[i]);
			a.attr("data-still", "")
			$("#gif-buttons").append(a);	
		}
	}

	$(document).on("click", ".gif", function(){
			var gifName = $(this).data("name");
			var urlGiffy = "https://api.giphy.com/v1/gifs/search?q=" 
			+ gifName + "&api_key=dc6zaTOxFJmzC&limit=10";
			
			$.ajax({
				url: urlGiffy,
				method: "GET"
			}).done(function(response){
				
				results = response.data;
				console.log(response);

				for (var i=0; i< results.length; i++){
					var gifDivAjx = $('<div>');
					var img = $('<div>');
					console.log(results[i].trending_datetime);
					img.html(results[i].rating);
					gifDivAjx.addClass("col-md-4")
					var gifImage = $('<img>');
						gifImage.attr("src", results[i].images.fixed_height.url);
						gifImage.attr("data-still", results[i].images.fixed_height.url);
						gifImage.attr("data-animate", results[i].images.original_still.url);
						gifImage.attr("data-state", "animate");
						gifDivAjx.append(img);
						gifDivAjx.append(gifImage);
						gifImage.addClass("gifState");
						$("#gif-appear-here").append(gifDivAjx);
						console.log(results[i].images.original_still.url);
				}
			})
	})
	
	$(document).on("click", ".gifState", function(){
		var state = $(this).attr("data-state");

		if (state === "still"){
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate");
				console.log("worked");
			}	else {
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
				console.log("didnt work");
			};
	})

	$('#addGif').on("click", function(event){
		var gif = $("#gif-input").val();
			
		gifSubjects.push(gif);
		console.log(gifSubjects.length)
		makeButtons();
	});
	
	makeButtons();
})