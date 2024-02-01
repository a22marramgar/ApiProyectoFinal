const mysql = require('mysql2');


// Configuración del pool de conexiones a la base de datos
const pool = mysql.createPool({
    connectionLimit: 10, // Número máximo de conexiones en el pool
    host: 'dam.inspedralbes.cat',
    user: 'a22osczapmar_User1234',
    password: 'User1234',
    database: 'a22osczapmar_puzzleGame'
})

function getUsers(callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            throw error
        }
        connection.query("SELECT * FROM user", (errorQuery, results) => {
            connection.release()
            if (errorQuery) {
                throw errorQuery
            }
            callback(results)
        })
    })
}

function getUserById(id, callback){
    pool.getConnection((error, connection) => {
        if (error) {
            throw error
        }
        connection.query("SELECT * FROM user WHERE id =?",id, (errorQuery, result) => {
            if (errorQuery) {
                throw errorQuery
            }
            callback(result)
        })
    })
}

function getUsernames(callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            throw error
        }
        connection.query("SELECT username FROM user", (errorQuery, results) => {
            connection.release()
            if (errorQuery) {
                throw errorQuery
            }
            callback(results)
        })
    })
}

function insertUser(values, callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            throw error
        }
        connection.query("INSERT INTO user(username, password) VALUES(?, ?)",values, (errorQuery, result) => {
            if (errorQuery) {
                throw errorQuery
            }
            callback(result)
        })
    })
}
function updateUser(values, callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            throw error
        }
        connection.query("UPDATE user SET username = ?, password = ? WHERE id = ?",values, (errorQuery, result) => {
            if (errorQuery) {
                throw errorQuery
            }
            callback(result)
        })
    })
}
module.exports = 
{
    getUsers,
    getUserById,
    insertUser,
    updateUser,
    getUsernames
}
