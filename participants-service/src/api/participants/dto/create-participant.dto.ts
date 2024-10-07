import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  username: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ nullable: false })
  eventId: number;
}
