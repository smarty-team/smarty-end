import * as mysql from 'mysql2/promise'
export async function createDataBase(config) {
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
    })
    // console.log('connec',connection)
    const res = await connection.query(
        `CREATE DATABASE IF NOT EXISTS ${config.database} default character set utf8 COLLATE utf8_general_ci;`,
    )
}
