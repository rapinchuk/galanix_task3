document.addEventListener("DOMContentLoaded", function(event) { 
	const input = document.querySelector("#input")
	const searchBtn = document.querySelector(".search_btn")
	const list = document.querySelector(".result_list")
	searchBtn.addEventListener("click", getData)

	function getData(e){
		e.preventDefault()
		const key = input.value
		const url = `http://universities.hipolabs.com/search?country=${key}`
		fetch(url)
			.then((resp) => resp.json())
			.then(function (data) {
				console.log(data);
				data.forEach(item => {
					const country = item.country
					const name = item.name
					const link = item.web_pages[0]
					const div = createNode(country,name,link)
					append(div)
				});
			
			})
			.catch(function (error) {
				console.log(error);
			});

	}


	// function render(data){
	// 	data.forEach(element => {
	// 		element.map(function(item) {
	// 			const country = item.country
	// 			const name = item.name
	// 			const link = item.link
	// 			createNode()
				
	// 		});
	// 	});
	// }
	function append(el) {

		return list.appendChild(el)
	}
	function createNode(country,name,link) {
		const div = document.createElement("div");
		div.classList.add('result_item')
		div.classList.add('item')
		div.innerHTML = `<span class="item_country">${country}</span>
		<span class="item_name">${name}</span>
		<a target="_blank" href=${link} class="item_link">Go to Site..</a>
		<span class="item_save"><input type="checkbox" name="save" id="save-item">&nbsp;save</span>`
		// console.log(div)
		return div
		
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