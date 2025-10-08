import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { Facultad } from '../../facultad/entities/facultad.entity';
import { PlanEstudio } from 'src/modules/plan-estudio/entities/plan-estudio.entity';

@Entity('carreras')
export class Carrera {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    codigo: string;

    @Column({ length: 255 })
    nombre: string;

    @ManyToOne(() => Facultad, (facultad) => facultad.carreras, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'facultad_id' })
    facultad: Facultad;

    @OneToMany(() => PlanEstudio, (plan) => plan.carrera)
    planesEstudio: PlanEstudio[];

    /*@CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;*/
}
