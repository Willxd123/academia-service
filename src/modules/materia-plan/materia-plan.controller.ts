import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { MateriaPlanService } from './materia-plan.service';
import { CreateMateriaPlanDto } from './dto/create-materia-plan.dto';
import { UpdateMateriaPlanDto } from './dto/update-materia-plan.dto';
import { MateriaPlan } from './entities/materia-plan.entity';

@ApiTags('Materia-Plan')
@Controller('materia-plan')
export class MateriaPlanController {
  constructor(private readonly materiaPlanService: MateriaPlanService) {}

  @Post()
  @ApiOperation({ summary: 'Crear relación materia-plan' })
  @ApiBody({ type: CreateMateriaPlanDto })
  @ApiResponse({
    status: 201,
    description: 'Relación creada exitosamente',
    type: MateriaPlan,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() dto: CreateMateriaPlanDto) {
    return this.materiaPlanService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las relaciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de relaciones',
    type: [MateriaPlan],
  })
  async findAll() {
    return this.materiaPlanService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener relación por ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Relación encontrada',
    type: MateriaPlan,
  })
  @ApiResponse({ status: 404, description: 'Relación no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.materiaPlanService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar relación' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdateMateriaPlanDto })
  @ApiResponse({
    status: 200,
    description: 'Relación actualizada',
    type: MateriaPlan,
  })
  @ApiResponse({ status: 404, description: 'Relación no encontrada' })
  async update(@Param('id') id: string, @Body() dto: UpdateMateriaPlanDto) {
    return this.materiaPlanService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar relación' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Relación eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Relación no encontrada' })
  async remove(@Param('id') id: string) {
    return this.materiaPlanService.remove(+id);
  }

}
