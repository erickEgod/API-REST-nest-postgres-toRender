import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

//!Este dto es el mismo de CreateCatDto pero todos los parámetros los hace opcionales
//*Se usa para el patch
export class UpdateCatDto extends PartialType(CreateCatDto) {}  
