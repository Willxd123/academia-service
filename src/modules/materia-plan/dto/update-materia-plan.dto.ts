import { PartialType } from '@nestjs/mapped-types';
import { CreateMateriaPlanDto } from './create-materia-plan.dto';

export class UpdateMateriaPlanDto extends PartialType(CreateMateriaPlanDto) {}
