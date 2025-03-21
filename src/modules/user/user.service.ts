import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException()
    return user
  }

  async createUser(createDto: CreateUserDto) {
    const { mobile } = createDto
    let user = await this.userRepository.findOneBy({ mobile })
    if (!user) {
      user = this.userRepository.create(createDto)
      return await this.userRepository.save(user)
    }
    return user
  }
}
