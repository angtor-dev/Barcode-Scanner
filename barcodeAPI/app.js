document.addEventListener("DOMContentLoaded", () => {
    if (!("BarcodeDetector" in window)) {
        alert("Este navegador no es compatible con la API BarcodeDetector")
        return
    }
    
    const barcodeDetector = new BarcodeDetector()
    const testImage = document.querySelector('img')

    barcodeDetector
    .detect(testImage)
    .then((barcodes) => {
        let pre = document.createElement("pre")
        pre.innerHTML = JSON.stringify(barcodes, null, 2)

        testImage.after(pre)
    })
    .catch(console.error)
})