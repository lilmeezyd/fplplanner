/* Look for any element with the class "custom-select" */
		let x = document.querySelectorAll('.custom-select')
		for(let i=0; i < x.length; i++) {
			let selectedElement = x[i].querySelector('select')

			/* For Each element, create a new DIV that will act as the selected item */
			let a = document.createElement('DIV')
			a.setAttribute("class", "select-selected")
			a.innerHTML = selectedElement.options[selectedElement.selectedIndex].innerHTML
			x[i].append(a)

			/* For Each element, create a new DIV that will contain the option list */
			let b = document.createElement('DIV')
			b.setAttribute("class", "select-items select-hide")
			for(let j=1; j < selectedElement.length; j++) {
				/* For each option in the original select element, create
				a new DIV that will act as an option item */
				c = document.createElement("DIV")
				c.innerHTML = selectedElement.options[j].innerHTML
				c.addEventListener("click", function(e) {
					/* When an item is clicked, update the original select box, and 
					the selected item */
					let s = this.parentNode.parentNode.getElementsByTagName("select")[0]
					let h = this.parentNode.previousSibling
					for(let i=0;  i < s.length; i++) {
						if(s.options[i].innerHTML == this.innerHTML) {
							s.selectedIndex = i 
							h.innerHTML = this.innerHTML
							let y = this.parentNode.getElementsByClassName('same-as-selected')
							for(let k=0; k<y.length; k++) {
								y[k].removeAttribute("class")
							}
							this.setAttribute("class", "same-as-selected");
							break;
						}
					}
					h.click()
				})
				b.appendChild(c)
			}
			x[i].append(b)
			a.addEventListener('click', function(e) {
				e.stopPropagation()
				closeAllSelect(this)

				this.nextSibling.classList.toggle("select-hide")
				this.classList.toggle("select-arrow-active")

			})
		}

		function closeAllSelect(elmnt) {

			let arr = []
			let x = document.getElementsByClassName("select-items")
			let y = document.getElementsByClassName("select-selected")

			for(let i=0; i < y.length; i++) {
				if(elmnt == y[i]) {
					arr.push(i)
				} else {
					y[i].classList.remove("select-arrow-active")
				}
			}
			for(let i=0; i < x.length; i++) {
				if(arr.indexOf(i)) {
					x[i].classList.add("select-hide")
				}
			}
		}

		document.addEventListener('click', closeAllSelect)

		let y = document.getElementsByClassName('player-cell')
		for(let i=0; i<y.length; i++) {
			y[i].addEventListener('click', function(e) {
				e.stopPropagation()
				close(this)
				y[i].classList.toggle('active')
			})
		}

		function close(e) {
			arr = []
			let x = document.getElementsByClassName('active')
			for(let i=0; i<x.length; i++) {
				if(e == x[i]) {
					arr.push(i)
				} else {
					x[i].classList.remove('active')
				}
			}

			
		}
		document.addEventListener('click', close)