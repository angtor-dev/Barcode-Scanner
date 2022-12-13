const videoEl = document.getElementById("camara")
videoEl.addEventListener("loadeddata", onOpened)

var decodeInterval
var decoding = false

if (!("BarcodeDetector" in window)) {
    alert("Este navegador no es compatible con la API BarcodeDetector")
} else {
    const barcodeDetector = new BarcodeDetector()

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
        videoEl.srcObject = stream

        // get the active track of the stream
        const track = stream.getVideoTracks()[0]
        // console.log(track.getSettings())

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

    function onOpened() {
        clearInterval(decodeInterval)
        decodeInterval = setInterval(decode, 500)
    }

    async function decode() {
        if (decoding === false) {
            console.log("Decoding...")

            decoding = true
            let barcodes = await barcodeDetector.detect(videoEl)
            decoding = false

            document.getElementById("codigo").textContent(barcodes.rawValue)

            let pre = document.createElement("pre")
            pre.innerHTML = JSON.stringify(barcodes, null, 2)

            videoEl.after(pre)
        }
    }
}