import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

type InvoicePayload = {
  organisationName: string;
  amount: string;
  periodInMonths: number;
  datePaid: string;
  endDate: string;
  organisationEmail: string;
};

const uploadDirectory = path.join(process.cwd() + '/mx-invoices/');

// Check if the directory exists, if not create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

export const generateInvoice = (
  payload: InvoicePayload,
  filename: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 20 });
    const filepath = `${uploadDirectory}${filename}.pdf`;
    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // Background and margins
    doc
      .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .fill('#f8fafc') // Slate-300 background
      .stroke();

    doc.font('Helvetica');

    // Title and subtitle
    doc
      .fontSize(20)
      .fill('#1f2937') // Darker text color for title
      .text(payload.organisationName, { align: 'center' })
      .moveDown(0.5)
      .fontSize(14)
      .fill('#6b7280') // Gray for subtitle
      .text('Invoice #123456', { align: 'center' })
      .moveDown(1);

    // Information Grid
    const startX = 40;
    const startY = 180;
    const columnWidth = (doc.page.width - 80) / 3;
    const rowHeight = 25;

    const infoFields = [
      { label: 'Amount paid:', value: payload.amount },
      { label: 'Date paid:', value: payload.datePaid },
      { label: 'End Date:', value: payload.endDate },
    ];

    infoFields.forEach((field, index) => {
      doc
        .fontSize(10)
        .fill('#6b7280') // Muted label color
        .text(field.label, startX + columnWidth * index, startY)
        .moveDown(0.5)
        .fontSize(12)
        .fill('#000000') // Normal text color
        .text(field.value, startX + columnWidth * index, startY + 12);
    });

    // Summary Section
    doc
      .moveDown(2)
      .fontSize(14)
      .fill('#1f2937') // Heading color
      .text('Summary', startX)
      .moveDown(0.5);

    const summaryItems = [
      { label: 'Amount', value: payload.amount },
      { label: 'Period', value: payload.periodInMonths },
      { label: 'Amount paid', value: payload.amount },
    ];

    summaryItems.forEach((item, index) => {
      doc
        .fontSize(12)
        .fill('#374151') // Dark text color for summary items
        .rect(
          startX,
          startY + 100 + index * rowHeight,
          doc.page.width - 80,
          rowHeight,
        )
        .stroke()
        .text(item.label, startX + 10, startY + 110 + index * rowHeight)
        .text(
          item.value.toString(),
          doc.page.width - 150,
          startY + 110 + index * rowHeight,
          { align: 'right' },
        );
    });

    // Contact Information
    doc
      .moveDown(2)
      .fontSize(10)
      .fill('#6b7280')
      .text(
        `If you have any questions, please contact us at ${payload.organisationEmail}`,
        startX,
        startY + 200,
        {
          width: doc.page.width - 80,
          align: 'center',
          lineGap: 5,
        },
      );

    // Finalize the PDF and end the stream
    doc.end();

    stream.on('finish', () => resolve(filepath));
    stream.on('error', (err) => reject(err));
  });
};
