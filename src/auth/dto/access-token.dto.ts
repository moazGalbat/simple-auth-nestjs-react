import { IsJWT } from 'class-validator';

export class AccessToken {
  @IsJWT()
  accessToken: string;
}
