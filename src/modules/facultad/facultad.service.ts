import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facultad } from './entities/facultad.entity';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';

@Injectable()
export class FacultadService {
  constructor(
    @InjectRepository(Facultad)
    private readonly repo: Repository<Facultad>,
  ) {}

  async create(dto: CreateFacultadDto) {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  findAll() {
    return this.repo.find({ relations: ['carreras'] });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({ where: { id }, relations: ['carreras'] });
    if (!e) throw new NotFoundException(`Facultad ${id} no encontrada`);
    return e;
  }

  async update(id: number, dto: UpdateFacultadDto) {
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: number) {
    const e = await this.findOne(id);
    await this.repo.remove(e);
    return { message: `Facultad ${id} eliminada correctamente` };
  }
}
