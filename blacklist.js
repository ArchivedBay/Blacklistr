/* The logic outline is as follows:
	When the extention starts up, 
		create the styles for it
		Start the event listeners for the buttons
		render the modal.
	
	When a user inputs the channel name(s),
		check to see if local storage already has a list.
			if it does, add the channel names to it
			if not, make the list and add the names to it.
		remove all of the videos by that channel
	
	when a user scrolls
		continuously check to see if anymore videos by anyone on the blacklist have been added, and remove them.
*/


	// STORAGE & USER LOGIC 
	const addUserToBlacklist = () => {
		let channelList = document.getElementById('channelName').value.split(', ').map((channel) => channel.trim()), blacklist;

		if( blacklistExists() ){ 
			blacklist = localStorage.blacklist.split(',');
			blacklist.push(channelList);
			input = '';
		} 
		else { blacklist = channelList; }
		
		localStorage.blacklist = blacklist;
	}

	const blacklistExists = () => localStorage.getItem('blacklist') !== null;

	const removeContent = () => {
		let blacklist = localStorage.blacklist.split(',');
		blacklist.forEach( (channel => blacklistChannel(channel)) )
	}

	const blacklistChannel = (channelName) => {
		let authorList = document.querySelectorAll('#byline');

		authorList.forEach( (author) => {
			if( author.textContent === channelName ){
				let video = author.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
					video.parentElement.removeChild(video);
			}
		});       
	}

	// UI LOGIC 
	const generateStyles = () => {
		let styles = document.createElement('style');

		const css = `
			#modalContainer, #modalContainer #buttonContainer, .closeModal { display: flex;}

			#modalContainer { color: #fff; background-color: #333;}
			#modalContainer input { background-color: #222; }
			#modalContainer input, .closeModal h2 { color: #4ac0dd; }
			#modalContainer button { background-color: #444; }
			#modalContainer button:hover { background-color: #4ac0dd; }


			#modalContainer {
				position: fixed;
				z-indeX: 9999999999999999999999999999999999999999999999;
				top: 5%;
				right: 5%;
				flex-Direction: column;
				justify-content: space-between;
				align-content: center;
				width: 300px;
				transition: opacity 0.2s ease;
			}

			#modalContainer h2 { font-size: 16px; }
			#modalContainer, #modalContainer input, #modalContainer button { padding: 10px; }
			#modalContainer button { width: 50%; }
			#modalContainer input::placeholder { text-align: center; }

			#modalContainer input, #modalContainer button {
				outline: none;
				border: none;
			}

			#modalContainer #buttonContainer { width: 100%;}
			#modalContainer #buttonContainer button {margin: 5px 2.5px 0 2.5px;}
			#modalContainer.fade { opacity: 0;}
			#modalContainer.hidden { display: none;}

			.closeModal { justify-content: space-between; }
			.closeModal h2 { letter-spacing: 3px; }
			.closeModal #closeModalButton { width: 50px; }
		`;

		if(styles.styleSheet){ 
			styles.styleSheet.cssText = css; 
		} else { 
			styles.appendChild(document.createTextNode(css)); 
		}

		document.getElementsByTagName('head')[0].appendChild(styles);
	}

	const toggleModal = (direction) => {
		let modal = document.getElementById('modalContainer');

		switch(direction){
			case 'in':
				modal.classList.toggle('hidden');
				setTimeout( () => modal.classList.toggle('fade'), 300);
				break;
				
			case 'out':
				modal.classList.toggle('fade');
				setTimeout( () => modal.classList.toggle('hidden'), 300);
				break;
		}
	}

	const createEl = (element, content=false, id=false, ...classN) => {
		let classListN = Array.from(classN)
				el = document.createElement(element);

		if(content) el.textContent = content;
		if(id) el.id = id;
		if(el.length > 0) classListN.forEach((c) => el.classList.add(c))
		 
		return el;
	}

	const createModal = () => {
		generateStyles();

		let fragment = document.createDocumentFragment(),
				modalContainer = createEl('div', false, 'modalContainer', 'hidden', 'fade'),
				closeModal = createEl('div', false, false, 'closeModal'),
				logo = createEl('h2', 'BLACKLISTR', false, false)
				closeButton = createEl('button', 'Close', 'closeModalButton', false);
				h2 = createEl('h2', "Enter the name of the channels separated by commas ',' that you'd like to blacklist exactly as they appear under their video."),
				input = createEl('input', false, 'channelName'),
				buttonContainer = createEl('div', false, 'buttonContainer'),
				addUser = createEl('button', 'Add User', 'addUser'),
				showList = createEl('button', 'Show List', 'showList');

		input.placeholder = 'channel name, i.e PewDiePie';

		buttonContainer.appendChild(addUser);
		buttonContainer.appendChild(showList);
		closeModal.appendChild(logo)
		closeModal.appendChild(closeButton);
		modalContainer.appendChild(closeModal);
		modalContainer.appendChild(h2);
		modalContainer.appendChild(input);
		modalContainer.appendChild(buttonContainer);

		fragment.appendChild(modalContainer);
		document.getElementsByTagName('body')[0].appendChild(fragment);

		startListeners();
		toggleModal('in');
	}

	const startListeners = () => {
		let addUserButton = document.getElementById('addUser'),
				showListButton = document.getElementById('showList'),
				closeModalButton = document.getElementById('closeModalButton');

		addUserButton.addEventListener('click', () => {
			addUserToBlacklist();
			removeContent();
		});

		closeModalButton.addEventListener('click', () => toggleModal('out'));

		// because of 'infinite scroll' you have to add a listener for page scroll.
		if(blacklistExists()) removeContent();
		window.onscroll = () => removeContent();
	}


	createModal();



