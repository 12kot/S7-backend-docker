import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  name: string;
}
