import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './entities/carrera.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private readonly repo: Repository<Carrera>,
  ) {}

  async create(dto: CreateCarreraDto) {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  findAll() {
    return this.repo.find({ relations: ['facultad', 'planesEstudio'] });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({ where: { id }, relations: ['facultad', 'planesEstudio'] });
    if (!e) throw new NotFoundException(`Carrera ${id} no encontrada`);
    return e;
  }

  async update(id: number, dto: UpdateCarreraDto) {
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: number) {
    const e = await this.findOne(id);
    await this.repo.remove(e);
    return { message: `Carrera ${id} eliminada correctamente` };
  }
}
