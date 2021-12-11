const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Script starts here
apiKey = '37a130aee41e440ea52a074a30546ef0';

// Disable Enable Button click
function toggleButton() {
	button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
	VoiceRSS.speech({
		key: apiKey,
		src: joke,
		hl: 'en-us',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false,
	});
}

// Get Jokes from Joke API
async function getJokes() {
	const apiUrl =
		'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${(data, setup)} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		tellMe(joke);
	} catch (error) {
		console.log('fetch failed', error);
	}
}

// Add event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
