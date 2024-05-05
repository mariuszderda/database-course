import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport-local';
import { User, UserDocument } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  public async validate(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      this.logger.debug(`User ${username} not found!`);
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`Invalid credential for user ${username}`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
