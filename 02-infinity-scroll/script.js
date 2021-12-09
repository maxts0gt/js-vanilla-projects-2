// Unsplash API
const count = 10;
const apiKey = '6WPj9mYbz78ZpB3pORSCZNfADiTqjF8jdFxAq1cG0fs';

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Get photoes from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		// Error here
	}
}

// On load
getPhotos();
