import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.entity';
import { AccessToken } from './types/accessToken';
import { SignupDto } from './dto/singup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly logger: Logger,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signup(payload: SignupDto): Promise<AccessToken> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );
    const userAlreadyExists = await this.userModel.findOne({
      email: payload.email,
    });
    if (userAlreadyExists) {
      throw new BadRequestException('User already exists');
    }
    const createdUser = new this.userModel({
      ...payload,
      password: hashedPassword,
    });
    await createdUser.save();
    this.logger.log(`User ${createdUser.email} created.`, AuthService.name);
    return this.generateTokens({
      userId: createdUser.id,
    });
  }

  async login(payload: LoginDto): Promise<AccessToken> {
    const user = await this.userModel.findOne({ email: payload.email });

    if (!user) {
      throw new NotFoundException('Incorrect email or password.');
    }

    const passwordValid = await this.passwordService.validatePassword(
      payload.password,
      user.password,
    );

    if (!passwordValid) {
      this.logger.error(`Incorrect email or password.`, AuthService.name);
      throw new NotFoundException('Incorrect email or password.');
    }

    return this.generateTokens({
      userId: user.id,
    });
  }

  validateUser(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId });
  }

  generateTokens(payload: { userId: string }): AccessToken {
    return {
      accessToken: this.generateAccessToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }
}
