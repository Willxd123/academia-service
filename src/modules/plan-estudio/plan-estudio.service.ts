import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanEstudio } from './entities/plan-estudio.entity';
import { CreatePlanEstudioDto } from './dto/create-plan-estudio.dto';
import { UpdatePlanEstudioDto } from './dto/update-plan-estudio.dto';

@Injectable()
export class PlanEstudioService {
  constructor(
    @InjectRepository(PlanEstudio)
    private readonly repo: Repository<PlanEstudio>,
  ) {}

  async create(dto: CreatePlanEstudioDto) {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  findAll() {
    return this.repo.find({ relations: ['carrera', 'materias'] });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({ where: { id }, relations: ['carrera', 'materias'] });
    if (!e) throw new NotFoundException(`PlanEstudio ${id} no encontrado`);
    return e;
  }

  async update(id: number, dto: UpdatePlanEstudioDto) {
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: number) {
    const e = await this.findOne(id);
    await this.repo.remove(e);
    return { message: `PlanEstudio ${id} eliminado correctamente` };
  }
}
