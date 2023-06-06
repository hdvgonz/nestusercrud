import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const newUSer = this.userRepository.create(user);

    return await this.userRepository.save(newUSer);
  }

  async findOneById(id: number) {
    const userById = await this.userRepository.findOneBy({ id });
    if (!userById) {
      console.log('Undefined');
      throw new NotFoundException(`${id} was not Found or not exist`);
    }
    console.log('existe');
    return userById;
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const userDB = await this.findOneById(id);
    const user = {
      ...userDB,
      ...body,
      id,
    };
    if (!userDB) return;
    console.log('Por aqui pasé');

    const updatedUser = await this.userRepository.preload(user);

    return this.userRepository.save(updatedUser);
  }

  async deleteUser(id: number) {
    const user = await this.findOneById(id);
    if (!user) return;

    await this.userRepository.delete(id);
  }
}
