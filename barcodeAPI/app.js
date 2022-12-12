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
    const video = document.querySelector('video')
    video.srcObject = stream

    // get the active track of the stream
    const track = stream.getVideoTracks()[0]
    // console.log(track.getSettings())

    // get current camera capabilities
    let capabilities = track.getCapabilities()
    console.log(capabilities)

    // update a capability
    if (capabilities.brightness) {
        track.applyConstraints({
            advanced: [{
                brightness: 0
            }]
        })
        .catch(error => console.error("Error trying to apply constraints: ", error))
    }
})
.catch(err => console.error('getUserMedia() failed: ', err))

document.addEventListener("DOMContentLoaded", () => {
    if (!("BarcodeDetector" in window)) {
        alert("Este navegador no es compatible con la API BarcodeDetector")
        return
    }
    
    const barcodeDetector = new BarcodeDetector()
    const video = document.querySelector('video')

    setInterval(() => {
        barcodeDetector
        .detect(video)
        .then((barcodes) => {
            let pre = document.createElement("pre")
            pre.innerHTML = JSON.stringify(barcodes, null, 2)
    
            video.after(pre)
        })
        .catch(console.error)
    }, 100)
})