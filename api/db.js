const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

/* 
,
,
,
`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username VARCHAR(10) NOT NULL, password VARCHAR(30) NOT NULL, user_type INTEGER NOT NULL);`
`INSERT INTO users(username,password,user_type) VALUES ('admin', '123', 1);`
`INSERT INTO users(username,password,user_type) VALUES ('zorzal', 'fio', 2);`
`INSERT INTO users(username,password,user_type) VALUES ('chincol', 'fiofio', 2);`
*/





let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')

    db.run(`DROP TABLE IF EXISTS messages;`)
    db.run(`DROP TABLE IF EXISTS users;`)
    
    db.run(`CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY NOT NULL, message TEXT NOT NULL );`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          db.run(`INSERT INTO messages(message) VALUES ('Bienvenidos al foro de Fans de las Aves Chilenas. Soy el Administrador.');`)
          db.run(`INSERT INTO messages(message) VALUES ('Se informa que la API se encuentra deshabilitada hasta nuevo aviso.');`)
        }
      }
    )

    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username VARCHAR(10) NOT NULL, password VARCHAR(30) NOT NULL, user_type INTEGER NOT NULL);`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          db.run(`INSERT INTO users(username,password,user_type) VALUES ('admin', '123', 1);`)
          db.run(`INSERT INTO users(username,password,user_type) VALUES ('zorzal', 'fio', 2);`)
          db.run(`INSERT INTO users(username,password,user_type) VALUES ('chincol', 'fiofio', 2);`)
        }
      }
    )


  }
});

module.exports = db
