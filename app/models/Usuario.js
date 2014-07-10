exports.definition = {
	config: {
		columns: {
		    "id": "int",
		    "nome": "string",
		    "email": "string",
		    "senha": "string",
		    "empresa_id": "int",
		    "pessoa_id": "int"
		},
		adapter: {
			type: "sql",
			collection_name: "Usuario"
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