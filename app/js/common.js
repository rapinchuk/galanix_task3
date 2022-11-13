document.addEventListener("DOMContentLoaded", function(event) { 
	const input = document.querySelector("#input")
	const searchBtn = document.querySelector(".search_btn")
	const list = document.querySelector(".result_list")
	const reset = document.querySelector(".search_reset")
	const description = document.querySelector(".result_description")
	const counterNode = document.querySelector(".favorite_counter")
	const favorite = document.querySelector(".favorite")
	const storage = window.localStorage
	const favoriteTitle = document.querySelector(".favorite-title")
	let counter= storage.length;
	let checkbox;
	


	counterNode.innerHTML = counter

	
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

	function clear() {
		const div = document.querySelectorAll(".result_item")
		description.style.cssText = "display: none;"
		return div.forEach(element => {
			element.remove()
		});
		
	}
	function resetHendler(e) {
		e.preventDefault()
		favoriteTitle.style.cssText = "display:none;"
		reset.style.cssText = "display: none;"
		clear()
		description.style.cssText = "display: inline-block;"
		
	}

	function getData(e){
		e.preventDefault()
		favoriteTitle.style.cssText = "display: none;"
		if(input.value){
		const key = input.value
		const url = `http://universities.hipolabs.com/search?country=${key}`
		fetch(url)
			.then((resp) => resp.json())
			.then(function (data) {
				// console.log(data);
				clear()
				data.forEach(item => {
					const country = item.country
					const name = item.name
					const link = item.web_pages[0]
					const div = createNode(country,name,link)
					append(div)
				});
				reset.style.cssText = "display: block;"
				
				checkbox = document.querySelectorAll("#save-item")
				checkbox.forEach(el => {
					el.addEventListener("change",checkboxHendler)
				});
				
			
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	}



	function checkboxHendler(e) {
		
		if (this.checked) {
			
			
			let value = e.target.closest(".result_item ").innerHTML
			let key = e.target.closest(".result_item ").querySelector(".item_link").getAttribute('href')
			storage.setItem(key,value)
			counter = storage.length
			counterNode.innerHTML = counter
		  	console.log(e.target);
	
		} else {
			const key = e.target.closest(".result_item ").querySelector(".item_link").getAttribute('href')
			
			counterNode.innerHTML = counter
			storage.removeItem(key)
			counter = storage.length
			counterNode.innerHTML = counter
			console.log(storage);
		  	console.log("Checkbox is not checked..");
		}
		
	  }

	function favoriteHendler() {
		reset.style.cssText = "display: block;"
		favoriteTitle.style.cssText = "display: inline-block;"
		renderFavorite()
		checkbox = document.querySelectorAll("#save-item")
		checkbox.forEach(el => {
			el.checked = true;
			el.addEventListener("change",checkboxHendler)
		});
		
	}
	
	function renderFavorite() {
		clear()
		for (let i = 0; i < storage.length; i++) {
			const div = document.createElement("div");
			div.classList.add('result_item')
			div.classList.add('item')
			div.innerHTML = storage.getItem(storage.key(i))
			console.log(div)
			append(div)
		}
		
	}



	reset.addEventListener("click",resetHendler)
	favorite.addEventListener("click",favoriteHendler)
	searchBtn.addEventListener("click", getData)
	
	// storage.clear()
	// 
  });