document.addEventListener("DOMContentLoaded", function(event) { 
	const input = document.querySelector("#input")
	const searchBtn = document.querySelector(".search_btn")
	
	searchBtn.addEventListener("click", getData)

	function getData(e){
		e.preventDefault()
		const key = input.value
		const url = `http://universities.hipolabs.com/search?country=${key}`
		fetch(url)
			.then((resp) => resp.json())
			.then(function (data) {
				console.log(data)
			})
			.catch(function (error) {
				console.log(error);
			});

	}

	// fetch("http://universities.hipolabs.com/search?country=Ukraine")
	// 	.then((resp) => resp.json())
	// 	.then(function (data) {
	// 		console.log(data)
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});


  });