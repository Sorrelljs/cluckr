module.exports = {
	development: {
		client: "pg",
		connection: {
			database: "cluckr_db",
		},
		migrations: {
			// Migrations are queries to build the schema of our database
			// e.g. creating tables, altering tables, deleting tables
			tableName: "migrations",
			directory: "./db/migrations",
		},
	},
};
