import path from 'path'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export default {
  PORT: 8080,
  nunjucks: {
    ext: 'html',
    path: path.join(__dirname, '../views'),
  },
  typeorm: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'xxx',
    password: '123456',
    database: 'user_schema',
    synchronize: false,
    logging: false,
  } as MysqlConnectionOptions
}