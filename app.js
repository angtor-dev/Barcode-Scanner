document.addEventListener("DOMContentLoaded", () => {
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
			readers: ["ean_reader"]
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
})