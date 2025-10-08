
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlanEstudioService } from './plan-estudio.service';
import { CreatePlanEstudioDto } from './dto/create-plan-estudio.dto';
import { UpdatePlanEstudioDto } from './dto/update-plan-estudio.dto';

@Controller('plan-estudio')
export class PlanEstudioController {
  constructor(
    private readonly planService: PlanEstudioService,
  ) {}

  @Post()
  async create(@Body() dto: CreatePlanEstudioDto) {
    return this.planService.create(dto);
  }

  @Get()
  async findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.planService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePlanEstudioDto) {
    return this.planService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.planService.remove(+id);
  }
}
