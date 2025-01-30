import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsUrl()
  url: string;

  @IsString()
  signature: string;

  @IsOptional()
  @IsString()
  description?: string;

  // On peut ajouter un champ pour l'ID du certificat si nécessaire
  certificatId: number;
}
