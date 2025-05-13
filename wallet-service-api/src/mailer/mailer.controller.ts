import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mailer')
export class MailerController {
 
}
