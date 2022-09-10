import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status-enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

//// basic and bearer
//@ApiSecurity('basic')
//@ApiSecurity('bearer')
@ApiBearerAuth()
@ApiBasicAuth()
@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto, @Req() req) {
    const user: User = req.user;
    this.logger.verbose(`User ${user.username} retrive all tasks `);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<Task> {
    const user: User = req.user;
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createtaskDto: CreateTaskDto, @Req() req): Promise<Task> {
    const user: User = req.user;
    return this.tasksService.createTask(createtaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number, @Req() req): Promise<void> {
    const user: User = req.user;
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskSratus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskValidationPipe) status: TaskStatus,
    @Req() req,
  ): Promise<Task> {
    const user: User = req.user;
    return this.tasksService.updateTaskSratus(id, status, user);
  }
}
