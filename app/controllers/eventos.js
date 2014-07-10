var args = arguments[0] || {};

var xhr = Ti.Network.createHTTPClient({
	onload: function() {
		var json = JSON.parse(this.responseText);
		if(json && json.length>0){
			var data = [];
			for(var i=0;i<json.length;i++){
				data.push({ title: json[i].titulo, hasChild:true, height:60, dados: json[i] });	
			}			
			$.viewEventos.setData(data);			
			
		}else{
			alert('Nenhum evento cadastrado');
		}
	},
	onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
     },
     timeout : 3000
});

var url = 'http://bsticket.apphb.com/Api/Eventos';
xhr.open('GET',url);
xhr.send();

$.eventos.open();

$.viewEventos.addEventListener('click', function(e) {
	if(e.rowData){
		Ti.API.info(e.rowData.dados.titulo);
	   	var Ingresso = Alloy.createController('ingressos', e.rowData.dados).getView();
		Ingresso.open();		
   	}  
});
