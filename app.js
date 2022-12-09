document.addEventListener("DOMContentLoaded", () => {
    // safely access `navigator.mediaDevices.getUserMedia`
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        const resultadoEl = document.getElementById("resultado")
        const formatoEl = document.getElementById("formato")

        Quagga.init({
	    	inputStream: {
	    		constraints: {
	    			width: 720,
	    			height: 720,
	    		},
	    		name: "Live",
	    		type: "LiveStream",
	    		target: document.getElementById("contenedor"),
	    	},
	    	decoder: {
	    		readers: ["ean_reader", "ean_8_reader", "code_128_reader", "upc_reader"]
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
    } else {
        alert("No se puede acceder a los datos de la camara")
    }
})