var lastDecodedText = ""

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);

    if (decodedText == lastDecodedText) return
    
    lastDecodedText = decodedText

    let resultsList = document.getElementById('decodedResults')

    let li = document.createElement('li')
    li.textContent = "Codigo: " + decodedText + " Formato: " + decodedResult.result.format.formatName
    resultsList.append(li)
}

function onScanFailure(error) {
    return
}

let scanConfig = {
    fps: 10,
    aspectRatio: 1,
    qrbox: { width: 250, height: 250 },
    showTorchButtonIfSupported: true
}

let html5QrcodeScanner = new Html5QrcodeScanner("reader", scanConfig, false);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);