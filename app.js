document.addEventListener("DOMContentLoaded", () => {
    iniciarEscaner()
})

function iniciarEscaner() {
    // safely access `navigator.mediaDevices.getUserMedia`
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        const resultadoEl = document.getElementById("resultado")
        const formatoEl = document.getElementById("formato")

        let resolucion = document.getElementById("resolucion").value

        Quagga.init({
	    	inputStream: {
	    		constraints: {
	    			width: resolucion,
	    			height: resolucion,
	    		},
	    		name: "Live",
	    		type: "LiveStream",
	    		target: document.getElementById("contenedor"),
	    	},
	    	decoder: {
	    		readers: ["ean_reader", "code_128_reader", "upc_reader"]
	    	}
	    }, function (err) {
	    	if (err) {
	    		console.log(err);
	    		return
	    	}
	    	console.log("Iniciado correctamente");
	    	Quagga.start();
	    });

        Quagga.onDetected((data) => {
	    	resultadoEl.textContent = data.codeResult.code;
	    	formatoEl.textContent = data.codeResult.format;
	    	console.log(data);
	    });

        Quagga.onProcessed(function (result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });
    } else {
        alert("No se puede acceder a los datos de la camara")
    }
    document.getElementById("iniciar").disabled = true
    document.getElementById("detener").disabled = false
}

function detenerEscaner() {
    Quagga.stop()
    document.getElementById("detener").disabled = true
    document.getElementById("iniciar").disabled = false
}