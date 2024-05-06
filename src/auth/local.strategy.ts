import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport-local';
import { User, UserDocument } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  public async validate(email: string, password: string): Promise<any> {
    // this.logger.debug(email, password);
    const user = await this.userModel.findOne({ email });

    if (!user) {
      this.logger.debug(`User  not found!`);
      throw new UnauthorizedException(`User not found!`);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`Invalid credential for user`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
