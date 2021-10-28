import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { createConnection } from 'typeorm';
import UserEntity from './models/user'

export default (config: MysqlConnectionOptions) => createConnection({
  entities: [UserEntity],
    ...config
});
