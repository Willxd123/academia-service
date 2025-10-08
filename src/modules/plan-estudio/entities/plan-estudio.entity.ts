import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MateriaPlan } from '../../materia-plan/entities/materia-plan.entity';
import { Carrera } from 'src/modules/carrera/entities/carrera.entity';

@Entity('planes_estudio')
export class PlanEstudio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column({ type: 'int' })
  cantidad_semestres: number;

  @Column({ type: 'boolean', default: true })
  vigente: boolean;

  @ManyToOne(() => Carrera)
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;

  @OneToMany(() => MateriaPlan, (materiaPlan) => materiaPlan.planEstudio)
  materias: MateriaPlan[];
}
