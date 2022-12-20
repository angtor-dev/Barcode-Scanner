function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
}

let scanConfig = {
    fps: 10,
    aspectRatio: 1,
    qrbox: { width: 250, height: 250 },
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    showTorchButtonIfSupported: true
}

let html5QrcodeScanner = new Html5QrcodeScanner("reader", scanConfig, false);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);