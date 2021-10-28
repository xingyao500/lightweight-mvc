import Controller from '../decorators/controller'
import { Get } from '../decorators/method'
import { Query } from '../decorators/params'
import { Render } from '../decorators/render'

@Controller()
class HomeController {
  @Get()
  @Render()
  index() {
    return {title: 'This is home page'}
  }

  @Get('/test')
  test(@Query() query: any) {
    return query
  }
}

export default HomeController