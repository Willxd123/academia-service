import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Carrera } from '../../carrera/entities/carrera.entity';

@Entity('facultades')
export class Facultad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 100 })
  abreviacion: string;

  @OneToMany(() => Carrera, (carrera) => carrera.facultad)
  carreras: Carrera[];

  /*@CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;*/
}
