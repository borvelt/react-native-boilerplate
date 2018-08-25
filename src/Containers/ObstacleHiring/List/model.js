import SQLite from 'react-native-sqlite-storage'
import {
  DATABASE_NAME,
  OBSTACLE_HIRING_TABLE,
} from '../../../Constants'

function DropSchema() {
  const db = SQLite.openDatabase(DATABASE_NAME)
  return new Promise(resolve => db.transaction(tx => {
    const sql = `DROP TABLE IF EXISTS \`${OBSTACLE_HIRING_TABLE}\`;`
    tx.executeSql(sql, [], (trans, success) => {
      resolve(success)
    }, (trans, error) => {
      throw new Error(error)
    })
  }))
}

function CreateSchema() {
  const db = SQLite.openDatabase(DATABASE_NAME)
  return new Promise(resolve => db.transaction(tx => {
    const sql = `CREATE TABLE IF NOT EXISTS \`${OBSTACLE_HIRING_TABLE}\` (\`id\` INTEGER PRIMARY KEY AUTOINCREMENT, \`chapter\` VARCHAR(255), \`segment\` VARCHAR(255), \`paragraph\` VARCHAR(255), \`description\` TEXT);`
    tx.executeSql(sql, [],
      () => {
        resolve(db)
      }, (trans, error) => {
        throw new Error(error)
      })
  }))
}

class Model {

  constructor(props) {
    Object.assign(this, props)
  }

  async save() {
    const db = SQLite.openDatabase(DATABASE_NAME)
    return new Promise(resolve => db.transaction(tx => {
      const sql = `INSERT INTO \`${OBSTACLE_HIRING_TABLE}\` (\`chapter\`, \`segment\`, \`paragraph\`, \`description\`) VALUES ("${this.chapter}", "${this.segment}", "${this.paragraph}", "${this.description}")`
      tx.executeSql(sql, [], (trans, success) => {
        resolve(success)
      }, (trans, error) => {
        throw new Error(error)
      })
    }))
  }

  static search(text) {
    let sql
    if (!text.length) {
      sql = `SELECT \`id\`, \`chapter\` FROM \`${OBSTACLE_HIRING_TABLE}\` GROUP BY \`chapter\` ORDER BY \`chapter\` ASC;`
    } else {
      sql = `SELECT * FROM \`${OBSTACLE_HIRING_TABLE}\` WHERE \`chapter\` LIKE "%${text}%" OR \`description\` LIKE "%${text}%" OR \`segment\` LIKE "%${text}% GROUP BY \`chapter\` ORDER BY \`chapter\` ASC";`
    }
    const db = SQLite.openDatabase(DATABASE_NAME)
    return new Promise(resolve => db.transaction(tx => {
      tx.executeSql(sql, [], (trans, success) => {
        let result = success.rows.raw()
        resolve(result)
      }, (trans, error) => {
        throw new Error(error)
      })
    }))
  }

}

export default Model
export {CreateSchema, DropSchema}