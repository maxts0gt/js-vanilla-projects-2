"use strict";
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const progressContainer = document.getElementById('progressContainer');
const progress = document.getElementById('progress');
// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army - remix',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row - remix',
        artist: 'Jacinto Design',
    },
];
// Check if playing
let isPlaying = false;
// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}
// Update DOm
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
// Current Song
let songIndex = 0;
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function updateProgressBar(e) {
    console.log(e);
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
}
// On Load - Select First Song
loadSong(songs[songIndex]);
// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
music.addEventListener('timeupdate', updateProgressBar);
