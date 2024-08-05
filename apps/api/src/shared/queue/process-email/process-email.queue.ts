import './process-email.worker';
import { BaseQueue } from '../base-queue';
import { emailWorker } from './process-email.worker';
import { GLOBAL_CONSTANTS } from '../../global-constants';
import { readFileSync } from 'fs';
import handleBars from 'handlebars';
import path from 'path';

class ProcessEmailQueue extends BaseQueue {
  constructor() {
    super(GLOBAL_CONSTANTS.QUEUE_NAMES.processEmail, emailWorker);
  }
  async sendEmail(data: {
    to: string;
    subject: string;
    html: string;
    attachments?: {
      filename: string;
      path: string;
      contentType: string;
    }[];
  }) {
    return this.add(GLOBAL_CONSTANTS.QUEUE_NAMES.processEmail, data);
  }

  async sendEmailWithTemplate({
    to,
    subject,
    templateFile,
    replacements,
  }: {
    to: string;
    subject: string;
    templateFile: string;
    replacements: Record<string, any> | any[];
  }) {
    // TODO: find a way to get templated file in build automatically
    const html = readFileSync(
      path.join(__dirname, `../../../templates/${templateFile}`),
      { encoding: 'utf8' },
    );
    const template = handleBars.compile(html);
    const htmlToSend = template(replacements);
    await this.sendEmail({ to, subject, html: htmlToSend });
  }
}

export const processEmailQueue = new ProcessEmailQueue();
