exports.up = function (knex) {
	return knex.schema.createTable("cluckr", (table) => {
		table.bigIncrements("id");
		table.string("username");
		table.text("logoUrl");
		table.text("content");
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("cluckr");
};
