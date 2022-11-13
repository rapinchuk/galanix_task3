document.addEventListener("DOMContentLoaded", function(event) { 
	const input = document.querySelector("#input")
	const searchBtn = document.querySelector(".search_btn")
	const list = document.querySelector(".result_list")
	const reset = document.querySelector(".search_reset")
	const counterNode = document.querySelector(".favorite_counter")
	const favorite = document.querySelector(".favorite")
	const storage = window.localStorage
	const message = document.querySelector(".message")
	const loader = document.querySelector(".lds-roller ")
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
		loader.style.cssText = "display: none;"
		
		return div.forEach(element => {
			element.remove()
		});
		
	}
	function resetHendler(e) {
		e.preventDefault()
		addArrow()
		reset.style.cssText = "display: none;"
		message.innerHTML = "Enter the name of the country whose universities you want to view <br>for example: <span class='result_description-span'>Ukraine</span>"
		clear()
		
		
	}

	function getData(e) {
		e.preventDefault()
		clear()
		reset.style.cssText = "display: none;"
		message.innerHTML = ""
		loader.style.cssText = "display: block;"
		if (input.value) {
			const key = input.value
			const url = `http://universities.hipolabs.com/search?country=${key}`
			fetch(url)
				.then((resp) => resp.json())
				.then(function (data) {
					if (data.length) {
						
						clear()
						data.forEach(item => {
							const country = item.country
							const name = item.name
							const link = item.web_pages[0]
							const div = createNode(country, name, link)
							append(div)
							anim(div)
						});
						document.querySelector(".result_item").classList.add("table_head")
						reset.style.cssText = "display: block;"
						deleteArrow()
						message.innerHTML = `Result for: <b>${input.value}</b><br>
							(${data.length})`
						checkbox = document.querySelectorAll("#save-item")
						checkbox.forEach(el => {
							el.addEventListener("change", checkboxHendler)
						});
					} else {
						reset.style.cssText = "display: none;"
						clear()
						addArrow()
						message.innerHTML = `No result for: <b>${input.value}</b><br>Please,try again`
						// clear()

					}


				})
				.catch(function (error) {
					console.log(error);
				});
		}else{
			clear()
			message.innerHTML ="Enter the name of the country whose universities you want to view <br>for example: <span class='result_description-span'>Ukraine</span>"

		}

	}



	function checkboxHendler(e) {
		
		if (this.checked) {
			
			
			let value = e.target.closest(".result_item ").innerHTML
			let key = e.target.closest(".result_item ").querySelector(".item_link").getAttribute('href')
			storage.setItem(key,value)
			counter = storage.length
			counterNode.innerHTML = counter
		  	
	
		} else {
			const key = e.target.closest(".result_item ").querySelector(".item_link").getAttribute('href')
			counterNode.innerHTML = counter
			storage.removeItem(key)
			counter = storage.length
			counterNode.innerHTML = counter
			
		}
		
	  }

	function favoriteHendler() {
		if(storage.length){
			deleteArrow()
			
			reset.style.cssText = "display: block;"
			message.innerHTML = "My favorite"
			
			renderFavorite()

			document.querySelector(".result_item").classList.add("table_head")
			checkbox = document.querySelectorAll("#save-item")
			checkbox.forEach(el => {
				el.checked = true;
				el.addEventListener("change",checkboxHendler)
			});
		}else{
			reset.style.cssText = "display: none;"
			addArrow()
			clear()
			message.innerHTML = "No any favorite university<br>Let`s searches"
		}
		
	}
	
	function renderFavorite() {
		clear()
		for (let i = 0; i < storage.length; i++) {
			const div = document.createElement("div");
			div.classList.add('result_item')
			div.classList.add('item')
			div.innerHTML = storage.getItem(storage.key(i))
			append(div)
			anim(div)
		}
		
	}
	function addArrow(){
		if (!message.classList.contains('arrow')) {
			message.classList.add("arrow")
		}
		
	}
	function deleteArrow(){
		if (message.classList.contains('arrow')) {
			message.classList.remove("arrow")
		}
		
	}



	function anim(el) {
		
 		gsap.fromTo(el,{opacity: 0, y: 150}, {duration: 1, opacity: 1, y: 0, stagger: .2})
	}

	message.innerHTML ="Enter the name of the country whose universities you want to view <br>for example: <span class='result_description-span'>Ukraine</span>"
	reset.addEventListener("click",resetHendler)
	favorite.addEventListener("click",favoriteHendler)
	searchBtn.addEventListener("click", getData)
	
	// storage.clear()
	// 
  });