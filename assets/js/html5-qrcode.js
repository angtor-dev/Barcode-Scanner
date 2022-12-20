function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);

    let resultsList = document.getElementById('decodedResults')

    let li = document.createElement('li')
    li.textContent = "Codigo: " + decodedText + " Formato: " + decodedResult.result.format.formatName
    resultsList.append(li)
}

function onScanFailure(error) {
    if (error == "QR code parse error, error = TypeError: Cannot read properties of undefined (reading 'formatName')") {
        return
    }
    
    console.warn(`Code scan error = ${error}`);
  }

let scanConfig = {
    fps: 10,
    aspectRatio: 1,
    qrbox: { width: 250, height: 250 },
    showTorchButtonIfSupported: true
}

let html5QrcodeScanner = new Html5QrcodeScanner("reader", scanConfig, false);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);