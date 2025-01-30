import { PartialType } from '@nestjs/mapped-types';
import { CreateStenoDto } from './create-steno.dto';

export class UpdateStenoDto extends PartialType(CreateStenoDto) {}
