import { Module } from '@nestjs/common';
import { PlanEstudioService } from './plan-estudio.service';
import { PlanEstudioController } from './plan-estudio.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PlanEstudio } from './entities/plan-estudio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEstudio])],
  controllers: [PlanEstudioController],
  providers: [PlanEstudioService],
  exports: [PlanEstudioService],
})
export class PlanEstudioModule {}
