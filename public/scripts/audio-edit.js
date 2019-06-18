var WaveformPlaylist = require('waveform-playlist');
var playlist = WaveformPlaylist.init({
    samplesPerPixel: 3000,
    mono: true,
    waveHeight: 70,
    container: document.getElementById('playlist'),
    state: 'cursor',
    colors: {
        waveOutlineColor: '#E0EFF1',
        timeColor: 'grey',
        fadeColor: 'black'
    },
    controls: {
        show: true,
        width: 200
    },
    zoomLevels: [500, 1000, 3000, 5000]
});

playlist.load([
{
    src: 'https://s3-us-west-1.amazonaws.com/riff-it/1555720826046-SampleAudio_0.4mb.mp3',
    name: 'Vocals',
    gain: 0.5,
}
]);

 