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

    doc.font('Helvetica').fontSize(12);

    // Rectangle as a container (background)
    doc
      .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .fill('#f8fafc') // slate-300 background
      .stroke();

    // Title and subtitle
    doc
      .fontSize(16)
      .fill('#000000')
      .text(payload.organisationName, 0, 110, { align: 'center' })
      .fontSize(10)
      .text('Invoice #123456', { align: 'center' });

    // Grid of information
    const startX = 20;
    const startY = 140;
    const columnWidth = (doc.page.width - 40) / 3;
    const rowHeight = 30;

    doc.fontSize(10).fill('#6b7280'); // muted foreground color

    // First column
    doc
      .text('Amount paid:', startX, startY)
      .fill('#000000')
      .text(payload.amount, startX, startY + 12);

    // Second column
    doc
      .fill('#6b7280')
      .text('Date paid:', startX + columnWidth, startY)
      .fill('#000000')
      .text(payload.datePaid, startX + columnWidth, startY + 12);

    // Third column
    doc
      .fill('#6b7280')
      .text('End Date:', startX + 2 * columnWidth, startY)
      .fill('#000000')
      .text(payload.endDate, startX + 2 * columnWidth, startY + 12);

    // Summary Section
    doc
      .fill('#000000')
      .fontSize(12)
      .text('Summary', startX, startY + rowHeight * 2);

    const summaryItems = [
      { label: 'Amount', value: payload.amount },
      { label: 'Period', value: payload.periodInMonths },
      { label: 'Amount paid', value: payload.amount },
    ];

    summaryItems.forEach((item, index) => {
      doc
        .rect(
          startX,
          startY + rowHeight * (3 + index),
          doc.page.width - 40,
          rowHeight,
        )
        .stroke()
        .fill('#000000')
        .text(item.label, startX + 10, startY + rowHeight * (3 + index) + 8)
        .text(
          item.value,
          doc.page.width - 120,
          startY + rowHeight * (3 + index) + 8,
        );
    });

    // Contact Section
    doc.text(
      `If you have any questions, please contact us at ${payload.organisationEmail}`,
      startX,
      startY + rowHeight * 7 + 20,
      {
        width: doc.page.width - 40,
        align: 'left',
        lineGap: 5,
      },
    );

    // Finalize the PDF and end the stream
    doc.end();

    stream.on('finish', () => resolve(filepath));
    stream.on('error', (err) => reject(err));
  });
};
