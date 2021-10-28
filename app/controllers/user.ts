import { inject } from 'inversify'
import Controller from '../decorators/controller'
import { Get } from '../decorators/method'
import { Query } from '../decorators/params'
import { GetUserDTO } from '../dto/user'
import UserService from '../services/user'

@Controller('/user')
class UserController {
  @inject('UserService') private userService: UserService

  @Get()
  getUser(@Query() query: GetUserDTO) {
    return this.userService.getUser(query)
  }
}

export default UserController