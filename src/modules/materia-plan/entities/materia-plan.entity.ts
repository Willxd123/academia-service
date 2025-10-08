import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { PlanEstudio } from '../../plan-estudio/entities/plan-estudio.entity';
import { Materia } from './materia.entity';

@Entity('materia_planes')
export class MateriaPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Materia)
  @JoinColumn({ name: 'materia_id' })
  materia: Materia;

  @ManyToOne(() => PlanEstudio, (plan) => plan.materias)
  @JoinColumn({ name: 'plan_estudio_id' })
  planEstudio: PlanEstudio;
}
