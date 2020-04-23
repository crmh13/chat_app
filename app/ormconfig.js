module.exports = {
  "type": "mysql",
  "host": "mysql_db",
  "port": 3306,
  "username": process.env.MYSQL_USER,
  "password": process.env.MYSQL_PASSWORD,
  "database": process.env.MYSQL_DATABASE,
  "synchronize": false,
  "logging": false,
  "entities": ["src/entities/**/*.ts"],
  "migrations": ["src/db/migrations/**/*.ts"],
  "subscribers": ["src/db/subscribers/**/*.ts"],
  "cli": {
     "entitiesDir": "src/entities",
     "migrationsDir": "src/db/migrations",
     "subscribersDir": "src/db/subscribers"
  }
}