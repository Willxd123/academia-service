import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCarreraDto {
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  facultad_id: number;
}
