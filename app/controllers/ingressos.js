var args = arguments[0] || {};

$.janela.title = args.titulo;


var Barcode = require('ti.barcode');
Barcode.allowRotation = true;
Barcode.displayedMessage = ' ';
Barcode.allowMenu = false;
Barcode.allowInstructions = false;
Barcode.useLED = true;

/**
 * Create a chrome for the barcode scanner.
 */
var overlay = Ti.UI.createView({
    backgroundColor: 'transparent',
    top: 0, right: 0, bottom: 0, left: 0
});
var switchButton = Ti.UI.createButton({
    title: Barcode.useFrontCamera ? 'Back Camera' : 'Front Camera',
    textAlign: 'center',
    color: '#000', backgroundColor: '#fff', style: 0,
    font: { fontWeight: 'bold', fontSize: 16 },
    borderColor: '#000', borderRadius: 10, borderWidth: 1,
    opacity: 0.5,
    width: 220, height: 30,
    bottom: 10
});
switchButton.addEventListener('click', function () {
    Barcode.useFrontCamera = !Barcode.useFrontCamera;
    switchButton.title = Barcode.useFrontCamera ? 'Back Camera' : 'Front Camera';
});
overlay.add(switchButton);
var cancelButton = Ti.UI.createButton({
    title: 'Cancel', textAlign: 'center',
    color: '#000', backgroundColor: '#fff', style: 0,
    font: { fontWeight: 'bold', fontSize: 16 },
    borderColor: '#000', borderRadius: 10, borderWidth: 1,
    opacity: 0.5,
    width: 220, height: 30,
    top: 20
});
cancelButton.addEventListener('click', function () {
    Barcode.cancel();
});
overlay.add(cancelButton);

/**
 * Create a button that will trigger the barcode scanner.
 */

function scanCode() {
    reset();
    // Note: while the simulator will NOT show a camera stream in the simulator, you may still call "Barcode.capture"
    // to test your barcode scanning overlay.
    Barcode.capture({
        animate: true,
        overlay: overlay,
        showCancel: false,
        showRectangle: false,
        keepOpen: true/*,
        acceptedFormats: [
            Barcode.FORMAT_QR_CODE
        ]*/
    });
};

/**
 * Now listen for various events from the Barcode module. This is the module's way of communicating with us.
 */
function reset() {
    $.numeroIngresso.value = '';
}
Barcode.addEventListener('error', function (e) {
	Ti.API.info('Cancel received');
	$.txtCodigo.value = 'Não encontrado';
	Ti.Media.vibrate([0,300]);
});
Barcode.addEventListener('cancel', function (e) {
    Ti.API.info('Cancel received');
});
Barcode.addEventListener('success', function (e) {
    Ti.API.info('Success called with barcode: ' + e.result);    
    if (e.contentType==Barcode.TEXT) {
    	efetuarConsultaLocal(e.result);
       	$.txtCodigo.value = e.result;       	
       	Ti.Media.vibrate([0,300]);
    }
});

function consultarCodigo(e){
	efetuarConsultaLocal($.numeroIngresso.value);
}

function efetuarConsultaLocal(codigo){
	var ingressos = Alloy.createCollection('Ingresso');
	ingressos.fetch();
	ingressos.where({ codigo_barra:codigo });
	if(ingressos.length==0){
		efetuarConsulta(codigo);
	}else{
		Ti.API.info('Achou ingresso localmente');
		$.txtCategoria.value = ingressos[0].categoria + ' - ' + ingressos[0].valor;				
		$.txtCliente.value = ingressos[0].cliente;
		$.txtCpf.value = ingressos[0].cpf_cliente;
	}
}

function efetuarConsulta(codigo){
	var xhr = Ti.Network.createHTTPClient({
		onload: function() {
			var json = JSON.parse(this.responseText);
			if(json.codigo_valido){				
				Ti.API.info('Mostrando na tela dados do ingresso');
				$.txtCategoria.value = json.categoria + ' - ' + json.valor;				
				$.txtCliente.value = json.cliente;
				$.txtCpf.value = json.cpf_cliente;
			}else{
				alert('Ingresso não encontrado');
			}
		},
		onerror : function(e) {
	         Ti.API.debug(e.error);
	         alert('error');
	     },
	     timeout : 3000  /* in milliseconds */
	});
	var url = 'http://bsticket.apphb.com/Api/Ingresso?codigo=' + codigo;
	
	xhr.open('GET',url);
	xhr.send();
}

function confirmarEntrada(){
	alert('Blz! Vamos salvar este ingresso!');
	reset();
};
