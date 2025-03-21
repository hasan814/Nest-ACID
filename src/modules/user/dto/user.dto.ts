import { IsString, IsNotEmpty, IsMobilePhone } from 'class-validator';

export class CreateUserDto {
  @IsMobilePhone('fa-IR')
  mobile: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

}
