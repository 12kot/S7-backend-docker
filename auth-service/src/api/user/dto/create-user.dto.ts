import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

//обычный интерфейс. Описывает, что может быть передано
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  password: string;
}
