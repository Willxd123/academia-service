import { firstValueFrom } from 'rxjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MateriaPlan } from './entities/materia-plan.entity';
import { CreateMateriaPlanDto } from './dto/create-materia-plan.dto';
import { UpdateMateriaPlanDto } from './dto/update-materia-plan.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MateriaPlanService {
  constructor(
    @InjectRepository(MateriaPlan)
    private readonly repo: Repository<MateriaPlan>,
    private readonly httpService: HttpService,
  ) {}

  
  async create(dto: CreateMateriaPlanDto) {
    if (!dto.materia_id) {
      throw new NotFoundException(`El campo materia_id es obligatorio`);
    }
    const isValidMateria = await this.validarMateria(dto.materia_id);
    if (!isValidMateria) {
      throw new NotFoundException(`Materia con ID ${dto.materia_id} no encontrada`);
    }
  
    const entity = this.repo.create({
      materia_id: dto.materia_id,
      plan_estudio_id: dto.plan_estudio_id,
      materia: { id: dto.materia_id },
      planEstudio: { id: dto.plan_estudio_id },
    });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['planEstudio'] });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({ where: { id }, relations: ['planEstudio'] });
    if (!e) throw new NotFoundException(`MateriaPlan ${id} no encontrada`);
    return e;
  }

  async update(id: number, dto: UpdateMateriaPlanDto) {
    if (!dto.materia_id) {
      throw new NotFoundException(`El campo materia_id es obligatorio`);
    }
    const isValidMateria = await this.validarMateria(dto.materia_id);
    if (!isValidMateria) {
      throw new NotFoundException(`Materia con ID ${dto.materia_id} no encontrada`);
    }

    const e = await this.findOne(id);
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: number) {
    const e = await this.findOne(id);
    await this.repo.remove(e);
    return { message: `MateriaPlan ${id} eliminada correctamente` };
  }

  private async validarMateria(materiaId: number): Promise<boolean> {
    try {
      const url = `http://materias-service:3000/api/materia/${materiaId}`;
      console.log('🔍 Validando materia:', url);
      
      const response = await firstValueFrom(
        this.httpService.get(url)
      );
      
      console.log('✅ Materia encontrada:', response.data);
      return true;
    } catch (error) {
      console.error('❌ Error validando materia:', error.message);
      return false;
    }
  }
 
}
