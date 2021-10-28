import { inject } from 'inversify'
import { Repository } from 'typeorm'
import Service from '../decorators/service'
import { GetUserDTO } from '../dto/user'
import UserEntity from '../models/user'

@Service()
class UserService {
  @inject('UserRepository') private userRepo: Repository<UserEntity>

  getUser(user: GetUserDTO) {
    return this.userRepo.findOne(user)
  }
}

export default UserService