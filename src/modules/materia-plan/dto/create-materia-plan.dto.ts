import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateMateriaPlanDto {
  @ApiProperty({
    description: 'ID de la materia',
    example: 1,
    type: Number,
  })
  @IsInt()
  @IsPositive()
  materia_id: number;

  @ApiProperty({
    description: 'ID del plan de estudio',
    example: 1,
    type: Number,
  })
  @IsInt()
  @IsPositive()
  plan_estudio_id: number;
}
