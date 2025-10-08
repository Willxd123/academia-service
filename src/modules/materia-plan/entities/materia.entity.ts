import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MateriaPlan } from './materia-plan.entity';

@Entity('materia')
export class Materia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => MateriaPlan, (materiaPlan) => materiaPlan.materia)
  materiaPlanes: MateriaPlan[];
}
