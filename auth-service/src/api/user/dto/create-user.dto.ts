import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  username?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  password: string;
}
