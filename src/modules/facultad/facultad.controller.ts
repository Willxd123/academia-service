import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FacultadService } from './facultad.service';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';

@Controller('facultad')
export class FacultadController {
  constructor(
    private readonly facultadService: FacultadService,
  ) {}

  @Post()
  async create(@Body() dto: CreateFacultadDto) {
    return this.facultadService.create(dto);
  }

  @Get()
  async findAll() {
    return this.facultadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.facultadService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateFacultadDto) {
    return this.facultadService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.facultadService.remove(+id);
  }
}
