exports.definition = {
	config: {
		columns: {
		    "id": "int",
		    "id_unico": "string",
		    "codigo_barra":"string",
		    "evento_id": "int",
		    "categoria": "string",
		    "cliente": "string",
		    "cpf_cliente": "string",
		    "valor": "decimal",
		    "entrou": "boolean"
		},
		adapter: {
			type: "sql",
			collection_name: "Ingresso"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};