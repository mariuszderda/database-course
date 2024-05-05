import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);

    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
      username: createUserDto.username,
    });
    if (existingUser) {
      throw new BadRequestException([
        `User: ${createUserDto.username} is already taken`,
      ]);
    }
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = await this.authService.hashPassword(createUserDto.password);
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    await user.save();

    return {
      ...(await user.save()).toObject(),
      token: this.authService.getTokenForUser(user),
    };
  }
}
