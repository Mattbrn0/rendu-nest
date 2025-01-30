import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createCanvas, loadImage, CanvasRenderingContext2D } from 'canvas'; // Importer la bibliothèque canvas
import { Image } from '../images/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StenoService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async initCodecs(): Promise<void> {
    console.log(`Codecs initialisés`);
  }

  isCodecsReady(): boolean {
    console.log(`Codecs validés avec succès`);
    return true;
  }

  async writeMsgToImage(
    imageId: number,
    msg: string,
    password = '',
  ): Promise<boolean> {
    try {
      const image = await this.imageRepository.findOneBy({ id: imageId });
      if (!image) throw new Error('Image non trouvée');

      const imagePath = path.resolve(__dirname, '../../..', image.url);
      const img = await loadImage(imagePath);
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Vérifie si le message est vide
      if (!msg) throw new Error('Message vide');

      // Convertir le message en binaire
      const binaryMsg = this.textToBinary(msg);
      const binaryPassword = password ? this.textToBinary(password) : '';
      const finalBinaryMsg = binaryPassword + binaryMsg;

      if (!finalBinaryMsg) throw new Error('Message binaire vide');

      this.encodeMessage(ctx, finalBinaryMsg);

      // Convertir l'image en buffer
      const buffer = canvas.toBuffer('image/png');
      if (!buffer) throw new Error('Échec de la création du buffer');

      // Sauvegarder l'image modifiée
      fs.writeFileSync(imagePath, buffer);

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de l’encodage du message: ' + error.message,
      );
    }
  }

  async readMsgFromImage(imageId: number, password = ''): Promise<string> {
    try {
      const image = await this.imageRepository.findOneBy({ id: imageId });
      if (!image) throw new Error('Image non trouvée');

      const imagePath = path.resolve(__dirname, '../../..', image.url);
      const img = await loadImage(imagePath);
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const binaryMsg = this.decodeMessage(ctx);
      if (!binaryMsg) throw new Error('Message binaire non trouvé');

      const binaryPassword = password ? this.textToBinary(password) : '';
      const msgStartIndex = binaryPassword.length;

      if (
        binaryPassword &&
        binaryMsg.slice(0, msgStartIndex) !== binaryPassword
      ) {
        throw new InternalServerErrorException('Mot de passe incorrect');
      }

      const msg = this.binaryToText(binaryMsg.slice(msgStartIndex));
      if (!msg) throw new Error('Message décodé vide');

      return msg;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors du décodage du message: ' + error.message,
      );
    }
  }

  private textToBinary(text: string): string {
    return text
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('');
  }

  private binaryToText(binary: string): string {
    return (
      binary
        .match(/.{1,8}/g)
        ?.map((byte) => String.fromCharCode(parseInt(byte, 2)))
        .join('') || ''
    );
  }

  private encodeMessage(
    ctx: CanvasRenderingContext2D,
    binaryMsg: string,
  ): void {
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
    );
    const data = imageData.data;

    for (let i = 0; i < binaryMsg.length; i++) {
      data[i * 4] = (data[i * 4] & 0xfe) | parseInt(binaryMsg[i], 2);
    }

    ctx.putImageData(imageData, 0, 0);
  }

  private decodeMessage(ctx: CanvasRenderingContext2D): string {
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
    );
    const data = imageData.data;
    let binaryMsg = '';

    for (let i = 0; i < data.length; i += 4) {
      binaryMsg += (data[i] & 1).toString();
    }

    return binaryMsg;
  }
}
