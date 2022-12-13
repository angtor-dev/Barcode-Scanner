const videoEl = document.getElementById("camara")
videoEl.addEventListener("loadeddata", startDecoding)

var decoding = false

if (!("BarcodeDetector" in window)) {
    alert("Este navegador no es compatible con la API BarcodeDetector")
} else {
    barcodeDetector = new BarcodeDetector()

    // solicita permisos para usar camara y sus ajustes por defecto
    navigator.mediaDevices.getUserMedia({
        video: {
            width: {min: 480, ideal: 1080},
            height: {min: 480, ideal: 1080},
            aspectRatio: {ideal: 1},
            facingMode: 'environment',
        }
    })
    .then((stream) => {
        localStream = stream
        videoEl.srcObject = stream

        // get the active track of the stream
        const track = stream.getVideoTracks()[0]
        console.log(track.getSettings())

        // get current camera capabilities
        let capabilities = track.getCapabilities()
        console.log(capabilities)

        // update a capability
        // if (capabilities.brightness) {
        //     track.applyConstraints({
        //         advanced: [{
        //             brightness: 0
        //         }]
        //     })
        //     .catch(error => console.error("Error trying to apply constraints: ", error))
        // }
    })
    .catch(err => console.error('getUserMedia() failed: ', err))
}

function startDecoding() {
    decodeInterval = setInterval(decode, 500)

    document.getElementById("startDecode").disabled = true
    document.getElementById("stopDecode").disabled = false
}

async function decode() {
    if (decoding === false) {
        console.log("Decoding...")

        decoding = true
        let barcodes = await barcodeDetector.detect(videoEl)
        decoding = false

        console.log(barcodes)
        console.log(barcodes.length)
        console.log(barcodes[0].length)

        if (barcodes.length != 0) {
            document.getElementById("codigo").textContent = barcodes[0].rawValue
            document.getElementById("formato").textContent = barcodes[0].format
        }
    }
}

function stopCamera() {
    try{
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
    } catch (e){
        alert(e.message);
    }

    stopDecoding()
}

function stopDecoding() {
    if (decodeInterval !== undefined) {
        clearInterval(decodeInterval)
        console.log("Decoding stop")
    }

    document.getElementById("startDecode").disabled = false
    document.getElementById("stopDecode").disabled = true
}