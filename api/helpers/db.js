const Database = require("better-sqlite3");

const DBSOURCE = "db.sqlite";

const db = new Database(DBSOURCE);

db.exec("DROP TABLE IF EXISTS messages");
db.exec("DROP TABLE IF EXISTS users");

db.exec("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY NOT NULL, message TEXT NOT NULL)");
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username VARCHAR(10) NOT NULL, password VARCHAR(30) NOT NULL, user_type INTEGER NOT NULL)");

db.exec("INSERT INTO messages(message) VALUES ('Bienvenidos al foro de Fans de las Aves Chilenas. Soy el Administrador.')");
db.exec("INSERT INTO messages(message) VALUES ('Se informa que la API se encuentra deshabilitada hasta nuevo aviso.')");

db.exec("INSERT INTO users(username,password,user_type) VALUES ('admin', '123', 1)");
db.exec("INSERT INTO users(username,password,user_type) VALUES ('zorzal', 'fio', 2)");
db.exec("INSERT INTO users(username,password,user_type) VALUES ('chincol', 'fiofio', 2)");

module.exports = db;
