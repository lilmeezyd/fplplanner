/*let index = 1
		showFixtures(index)

		function newFixture(n) {
			showFixtures(index += n)
		}

		function showFixtures(n) {
			let fixtures = document.querySelectorAll('.fixtureWrap')
			let firstFixture = fixtures[0]
			let prevButtons = firstFixture.querySelector('.buttons')
			let firstButton = prevButtons.querySelectorAll('.btn')[0]
			firstButton.style.display = 'none'

			let lastFixture = fixtures[fixtures.length - 1]
			let nextButtons = lastFixture.querySelector('.buttons')
			let lastButton = nextButtons.querySelectorAll('.btn')[1]
			lastButton.style.display = 'none'

			if(n > fixtures.length) { index = 1}
			if(n < 1) { index = fixtures.length}
			
			for(let i = 0; i<fixtures.length; i++) {
				fixtures[i].style.display = 'none'
			}	
			fixtures[index-1].style.display = 'block'
		} */