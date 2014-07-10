function entrar_click(e){
	var xhr = Ti.Network.createHTTPClient({
		onload: function() {
			var json = JSON.parse(this.responseText);
			if(json.autenticado){
				var Evento = Alloy.createController('eventos').getView();
				Evento.open();				
			}else{
				alert('Usuário e senha inválidos');
			}
		},
		onerror : function(e) {
	         Ti.API.debug(e.error);
	         alert('error');
	     },
	     timeout : 3000  /* in milliseconds */
	});
	var email = $.email.value;
	var senha = $.senha.value;
	var url = 'http://bsticket.apphb.com/Api/Login?email=' + email + '&senha=' + senha;
	
	xhr.open('GET',url);
	xhr.send();
}

function sair_click(e){
	$.index.close();
}


$.index.open();
