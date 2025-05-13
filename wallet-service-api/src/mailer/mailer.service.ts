import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendTokenEmail(to: string, token: string): Promise<void> {
    const response = await this.mailerService.sendMail({
      to,
      subject: 'Confirmación de pago',
      html: `
       <div style="font-family: Arial, sans-serif; padding: 20px;">
        
          <p>Estás a punto de realizar un pago en tu billetera virtual.</p>
          <p>Tu código de confirmación es:</p>
          <p style="font-size: 24px; font-weight: bold; color: #2c3e50;">${token}</p>
          <p>Este código es válido solo por unos minutos.</p>
          <hr />
          <p style="font-size: 12px; color: #888;">No compartas este código con nadie.</p>
          <p style="font-size: 12px; color: #888;">Equipo de Billetera Virtual</p>
        </div>
      `,
    });

    this.logger.log(`Correo enviado. Ver en: ${response.messageId}`);
  }
}
