/**
 * Created by noamc on 8/31/14.
 */


module.exports = function (config) {
    // console.log('do we have binary client: ', BinaryClient)
    var client,
        recorder,
        context,
        bStream,
        contextSampleRate = (new AudioContext()).sampleRate;
        // resampleRate = contextSampleRate,
        var resampleRate = 44100,
        // contextSampleRate = 16000,
        worker = new Worker('./js/worker/resampler-worker.js');

    


    console.log('what is contextSampleRate: ', contextSampleRate)
    worker.postMessage({cmd:"init",from:contextSampleRate,to:resampleRate});

    worker.addEventListener('message', function (e) {
        if (bStream && bStream.writable)
            bStream.write(convertFloat32ToInt16(e.data.buffer));
    }, false);


    function clientStart(config){
        console.log('Initiating transfer client belong to ID: ', config.clientId)
        close();
        // const URL = "localhost:9191"

        const URL = config.SPEECHURL;
        console.log('URL destination for speech data transfer: ', URL)
        console.log('set URL in _initClient configs in ai.js')
        // client = new window.BinaryClient('wss://'+location.host);
        client = new window.BinaryClient('wss://'+URL);

        // client.on('stream', function(stream, meta){
        //     console.log('streaming is happenin', stream, meta)
        //     stream.on('data', function(data){
        //         console.log('streaming data', data)
        //     })
        //     stream.on('end', function(){
        //         console.log('stream ended in streamclient')
        //     })
        // })

        client.on('open', function () {
            console.log('streaming client turned on')
            bStream = client.createStream({sampleRate: resampleRate, clientId: config.clientId});
            // bStream.on('data', function(s){
            //     console.log('data is being piped', s)
            // })
            // bStream.on('end', function(s){
            //     console.log('stream end event triggerd', s)
            // })
            // bStream.on('pause', function(s){
            //     console.log('stream pause event', s)
            // })

            // client.on('stream', function(data){
            // console.log('streaming is happenin', data)
            // })
        });

        // client.on('end', function(d){
        //     console.log('CLIENT ENDED EVENT TRIGGERED')
        // })

        // client.on('stream', function(data){
        //     console.log('streaming is happenin', data)
        // })

        if (context) {
            recorder.connect(context.destination);
            return;
        }

        var session = {
            audio: true,
            video: false
        };


        navigator.getUserMedia(session, function (stream) {
            context = new AudioContext();
            // stream
            var audioInput = context.createMediaStreamSource(stream);
            var bufferSize = 0; // let implementation decide

            recorder = context.createScriptProcessor(bufferSize, 1, 1);

            recorder.onaudioprocess = onAudio;

            audioInput.connect(recorder);

            recorder.connect(context.destination);

        }, function (e) {
           console.log('client getting microphone error: ', e) 
        });
    }

    function clientEnd(){
        close();
    }

    // $(".start-rec-btn").click(function () {
    //     console.log('INITIATING BUTTON REGISTRAR', BinaryClient)
    //     close();
    //     const URL = "localhost:9191"
    //     console.log('what is the url: ', location.host )
    //     // client = new window.BinaryClient('wss://'+location.host);
    //     client = new window.BinaryClient('wss://'+URL);
    //     client.on('open', function () {
    //         console.log('streaming client turned on')
    //         bStream = client.createStream({sampleRate: resampleRate});
    //     });

    //     if (context) {
    //         recorder.connect(context.destination);
    //         return;
    //     }

    //     var session = {
    //         audio: true,
    //         video: false
    //     };


    //     navigator.getUserMedia(session, function (stream) {
    //         context = new AudioContext();
    //         var audioInput = context.createMediaStreamSource(stream);
    //         var bufferSize = 0; // let implementation decide

    //         recorder = context.createScriptProcessor(bufferSize, 1, 1);

    //         recorder.onaudioprocess = onAudio;

    //         audioInput.connect(recorder);

    //         recorder.connect(context.destination);

    //     }, function (e) {

    //     });
    // });

    function onAudio(e) {
        var left = e.inputBuffer.getChannelData(0);

        worker.postMessage({cmd: "resample", buffer: left});

        drawBuffer(left);
    }

    function convertFloat32ToInt16(buffer) {
        var l = buffer.length;
        var buf = new Int16Array(l);
        while (l--) {
            buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
        }
        return buf.buffer;
    }

    //https://github.com/cwilso/Audio-Buffer-Draw/blob/master/js/audiodisplay.js
    function drawBuffer(data) {
        // console.log('data: ', data)
        var canvas = document.getElementById("canvas"),
            width = canvas.width,
            height = canvas.height,
            context = canvas.getContext('2d');

        context.clearRect (0, 0, width, height);
        var step = Math.ceil(data.length / width);
        var amp = height / 2;
        for (var i = 0; i < width; i++) {
            var min = 1.0;
            var max = -1.0;
            for (var j = 0; j < step; j++) {
                var datum = data[(i * step) + j];
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }

            var grd= context.createLinearGradient(0,0,170,0);
            grd.addColorStop(0,"green");
            grd.addColorStop(1,"grey");

            context.fillStyle=grd;
            context.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
        }
    }

    // $(".stop-rec-btn").click(function () {
    //     close();
    // });

    function close(){
        console.log('close');
        if(recorder)
            recorder.disconnect();
        if(client)
            client.close();
    }

    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;


    return {
        start: clientStart,
        end: clientEnd
    }
};


// navigator.getUserMedia = navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia ||
//     navigator.msGetUserMedia