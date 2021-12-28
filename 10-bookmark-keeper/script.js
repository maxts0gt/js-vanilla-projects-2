const modal = document.getElementById('modal');
const modalShow = document.getElementById('open-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Show Modal, focus on input

function showModal() {
	modal.classList.add('show-modal');
	websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () =>
	modal.classList.remove('show-modal')
);
window.addEventListener('click', (e) =>
	e.target === modal ? modal.classList.remove('show-modal') : false
);

// validate form
function validate(nameValue, urlValue) {
	const expression =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
	const regex = new RegExp(expression);

	if (!nameValue || !urlValue) {
		alert('Please submit values for both fields.');
		return false;
	}

	if (urlValue.match(regex)) {
		// alert('match');
	}
	if (!urlValue.match(regex)) {
		alert('Please provide a valid web address');
	}
	// valid
	return true;
}

// Handle data from Bookmark
function storeBookmark(e) {
	e.preventDefault();
	const nameValue = websiteNameEl.value;
	let urlValue = websiteUrlEl.value;
	if (!urlValue.includes('http://', 'https://')) {
		urlValue = `https://${urlValue}`;
	}
	if (!validate(nameValue, urlValue)) {
		return false;
	}

	const bookmark = {
		name: nameValue,
		url: urlValue,
	};

	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
	bookmarkForm.reset();
	websiteNameEl.focus();
}

// Build Bookmarks DOM
function buildBookmarks() {
	// Remove all bookmark elements
	bookmarksContainer.textContent = '';

	bookmarks.forEach((bookmark) => {
		const { name, url } = bookmark;
		const item = document.createElement('div');
		item.classList.add('item');
		// Close icon
		const closeIcon = document.createElement('i');
		closeIcon.classList.add('fas', 'fa-times');
		closeIcon.setAttribute('onClick', `deleteBookmark('${url}')`);
		// Favicon and link container
		const linkInfo = document.createElement('div');
		linkInfo.classList.add('name');
		// Favicon
		const favicon = document.createElement('img');
		favicon.setAttribute(
			'src',
			`https://s2.googleusercontent.com/s2/favicons?domain=${url}`
		);
		favicon.setAttribute('alt', 'Favicon');
		//
		const link = document.createElement('a');
		link.setAttribute('href', `${url}`);
		link.setAttribute('target', `_blank`);
		link.textContent = name;
		// Append to bookmarks container
		linkInfo.append(favicon, link);
		item.append(closeIcon, linkInfo);
		bookmarksContainer.appendChild(item);
	});
}

// Delete Bookmark
function deleteBookmark(url) {
	bookmarks.forEach((bookmark, i) => {
		if (bookmark.url === url) {
			bookmarks.splice(i, 1);
		}
	});

	// update bookmarks in localStorage & repopulate DOM
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
	// Get bookmarks from localstorage if available
	if (localStorage.getItem('bookmarks')) {
		bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	} else {
		// Create bookmarks array in localStorage
		bookmarks = [
			{
				name: 'Max Tsogt',
				url: 'https://maxtsogt.com',
			},
		];
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	buildBookmarks();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On load
fetchBookmarks();
