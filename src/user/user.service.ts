import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDTO, UpdateDTO } from 'src/auth/authValidation/auth.validation';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findByEmail(
    email: string,
    str: string = '',
  ): Promise<(User & { _id: string }) | null> {
    return this.userModel.findOne({ email }).select(str);
  }
  async createUser(user: SignupDTO): Promise<User | null> {
    return await this.userModel.create({
      ...user,
    });
  }
  async findById(id: string): Promise<(User & { _id: string }) | null> {
    return await this.userModel.findById(id);
  }
  async updateUser(
    user: User & { _id: string },
    updates: UpdateDTO,
  ): Promise<(User & { _id: string }) | null> {
    return await this.userModel
      .findByIdAndUpdate(user._id, updates, {
        new: true,
      })
      .select('-password');
  }
}
