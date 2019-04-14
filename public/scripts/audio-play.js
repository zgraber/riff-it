var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    scrollParent: true
});

wavesurfer.load('https://s3-us-west-1.amazonaws.com/riff-it/1555220065103-Loopo_b.wav.mp3');