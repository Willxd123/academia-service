import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFacultadDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  abreviacion: string;
}
