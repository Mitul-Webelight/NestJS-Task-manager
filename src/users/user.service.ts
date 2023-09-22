import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAll() {
    return this.userModel.find();
  }
  async getById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { firstName, lastName, username, email } = updateUserDto;

    return this.userModel.findByIdAndUpdate(
      {
        firstName,
        lastName,
        username,
        email,
      },
      { new: true },
    );
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete({ _id: id });
  }
}
