function entrar_click(e){
	var txtemail = $.email.value;
	var txtsenha = $.senha.value;
	
	var usuarios = Alloy.createCollection('Usuario');
	usuarios.fetch();
	usuarios.where({email:txtemail, senha: txtsenha});
	
	if(usuarios.length==0){	
		Ti.API.info('Nenhum usuário encontrado - Efetuando consulta na web.');
		var xhr = Ti.Network.createHTTPClient({
			onload: function() {
				var json = JSON.parse(this.responseText);
				if(json.autenticado){
					Ti.API.info('Salvando usuário');
					var user = Alloy.createModel('Usuario', {id: json.id, email:txtemail,
								 senha:txtsenha, empresa_id:json.empresa_id, pessoa_id: json.pessoa_id });
					user.save();
					
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
		var url = 'http://bsticket.apphb.com/Api/Login?email=' + txtemail + '&senha=' + txtsenha;
		
		xhr.open('GET',url);
		xhr.send();
	}else{
		Ti.API.info('Usuario encontrado local.');
		var Evento = Alloy.createController('eventos').getView();
		Evento.open();
	}
}

function sair_click(e){
	$.index.close();
}


$.index.open();
