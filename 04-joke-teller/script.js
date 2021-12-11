const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
// Script starts here
apiKey = '37a130aee41e440ea52a074a30546ef0';

// function test() {
// 	VoiceRSS.speech({
// 		key: apiKey,
// 		src: 'Hello, world!',
// 		hl: 'en-us',
// 		r: 0,
// 		c: 'mp3',
// 		f: '44khz_16bit_stereo',
// 		ssml: false,
// 	});
// }

// Get Jokes from Joke API
async function getJokes() {
	const apiUrl =
		'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${(data, setuo)} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		console.log(data.joke);
	} catch (error) {
		console.log('fetch failed', error);
	}
}

// On load
// test();
getJokes();
