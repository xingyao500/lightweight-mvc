import { IsString } from 'class-validator'

export class GetUserDTO {
  @IsString()
  name: string
}