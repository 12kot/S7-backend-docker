import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

//1 в 1 как и auth-service
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
