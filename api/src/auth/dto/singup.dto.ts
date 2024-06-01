import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPasswordComplex } from '../password.validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPasswordComplex({
    message: 'password is not complex enough',
  })
  password: string;
}
