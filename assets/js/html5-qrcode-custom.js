const html5QrCode = new Html5Qrcode("reader");
const startScanEl = document.getElementById('iniciarEscaner')
const stopScanEl = document.getElementById('detenerEscaner')

var lastDecodedText = ""

function onScanSuccess(decodedText, decodedResult) {
    if (decodedText == lastDecodedText) return

    lastDecodedText = decodedText
    let resultsTable = document.getElementById('table-results')

    console.log(`decodedText: ${decodedText} Format: ${decodedResult.result.format.formatName}`)

    let tr = document.createElement('tr')
    tr.innerHTML = `<td>${decodedResult.result.format.formatName}</td><td>${decodedText}</td>`
    resultsTable.append(tr)
}

function startScanner() {
    let scanConfig = {
        fps: 10,
        aspectRatio: 1,
        qrbox: { width: 250, height: 250 }
    }

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            // var cameraId = devices[0].id;

            html5QrCode.start(
                { facingMode: "environment" },
                scanConfig,
                onScanSuccess,
                (errorMessage) => {})
            .catch((err) => {
                // Start failed, handle it.
                console.log(err)
            });

            stopScanEl.classList.toggle('d-block')
            startScanEl.classList.toggle('d-none')
        }
    }).catch(err => {
        // handle err
    });
}

function stopScanner() {
    html5QrCode.stop()
    
    stopScanEl.classList.toggle('d-block')
    startScanEl.classList.toggle('d-none')
}