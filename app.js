document.addEventListener("DOMContentLoaded", () => {
    // safely access `navigator.mediaDevices.getUserMedia`
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        const resultadoEl = document.getElementById("resultado")

        Quagga.init({
	    	inputStream: {
	    		constraints: {
	    			width: 1920,
	    			height: 1080,
	    		},
	    		name: "Live",
	    		type: "LiveStream",
	    		target: document.getElementById("contenedor"),
	    	},
	    	decoder: {
	    		readers: ["code_128_reader", "ean_reader", "codabar_reader", "i2of5_reader", "code_93_reader"]
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
	    	$resultados.textContent = data.codeResult.code;
	    	console.log(data);
	    });
    } else {
        alert("No se puede acceder a los datos de la camara")
    }
})