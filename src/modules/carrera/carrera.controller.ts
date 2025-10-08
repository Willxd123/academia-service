import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Controller('carrera')

export class CarreraController {
  constructor(
    private readonly carreraService: CarreraService,
  ) { }

  @Post()
  async create(@Body() dto: CreateCarreraDto) {
    return this.carreraService.create(dto);
  }

  @Get()
  async findAll() {
    return this.carreraService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carreraService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCarreraDto) {
    return this.carreraService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.carreraService.remove(+id);
  }
}
