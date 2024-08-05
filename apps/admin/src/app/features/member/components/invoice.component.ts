import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, inject, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ApiService } from '../../../shared/services/api.service';
import { TMemberPlan, TPlan } from '../../../../../../../libs/mx-schema/src';
import { UserService } from '../../../shared/services/user-data.service';

type MemberPlanDetail = {
  memberPlan: TMemberPlan;
  plan: TPlan;
};

@Component({
  selector: 'view-invoice',
  template: `<mx-dialog-content>
    @let organisation = organisation$ | async;
    @if (downloadPDF) {
      <div
        id="print-section"
        class="relative flex flex-col shadow-lg rounded-xl pointer-events-auto text-black "
      >
        <div
          class="relative overflow-hidden min-h-32 text-center rounded-t-xl  bg-slate-300"
        >
          <!-- SVG Background Element -->
          <figure class="absolute inset-x-0 bottom-0 -mb-px">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 1920 100.1"
            >
              <path
                fill="currentColor"
                class="fill-white"
                d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
              ></path>
            </svg>
          </figure>
          <!-- End SVG Background Element -->
        </div>

        <div class="relative z-10 -mt-12 ">
          <!-- Icon -->
          <span
            class="mx-auto flex justify-center items-center size-[62px] rounded-full border bg-white border-black"
          >
            <svg
              class="shrink-0 size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="fill-black"
              viewBox="0 0 16 16"
            >
              <path
                d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"
              />
              <path
                d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </span>
          <!-- End Icon -->
        </div>

        <!-- Body -->
        <div class="p-4 sm:p-7 overflow-y-auto">
          <div class="text-center">
            <h3 id="hs-ai-modal-label" class="text-lg font-semibold ">
              {{ organisation?.name }}
            </h3>
            <p class="text-sm ">Invoice #{{ invoiceData?.memberPlan?.id }}</p>
          </div>

          <!-- Grid -->
          <div class="mt-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
            <div>
              <span class="block text-xs uppercase text-muted-foreground"
                >Amount paid:</span
              >
              <display-currency
                [amount]="invoiceData?.plan?.amount || 0"
                class="font-semibold text-sm"
              />
            </div>
            <!-- End Col -->

            <div>
              <span class="block text-xs uppercase text-muted-foreground"
                >Date paid:</span
              >
              <span class="block text-sm font-medium ">{{
                invoiceData?.memberPlan?.startDate | date: 'mediumDate'
              }}</span>
            </div>
            <!-- End Col -->

            <div>
              <span class="block text-xs uppercase text-muted-foreground"
                >End Date:</span
              >
              <span class="block text-sm font-medium ">{{
                invoiceData?.memberPlan?.endDate | date: 'mediumDate'
              }}</span>
            </div>
            <!-- End Col -->
          </div>
          <!-- End Grid -->

          <div class="mt-5 sm:mt-10">
            <h4 class="text-xs font-semibold uppercase ">Summary</h4>

            <ul class="mt-3 flex flex-col">
              <li
                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm border  -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg "
              >
                <div class="flex items-center justify-between w-full">
                  <span>Amount</span>
                  <display-currency
                    [amount]="invoiceData?.plan?.amount || 0"
                    class="font-normal text-sm"
                  />
                </div>
              </li>
              <li
                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm border  -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg "
              >
                <div class="flex items-center justify-between w-full">
                  <span>Period</span>
                  <p>{{ invoiceData?.plan?.periodInMonths }} Months</p>
                </div>
              </li>
              <li
                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold  border  -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg "
              >
                <div class="flex items-center justify-between w-full">
                  <span>Amount paid</span>
                  <display-currency
                    [amount]="invoiceData?.plan?.amount || 0"
                    class="font-semibold text-sm"
                  />
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-5 sm:mt-10">
            <p class="text-sm ">
              If you have any questions, please contact us at
              <a
                class="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2  focus:outline-none focus:underline font-medium dark:text-blue-500"
                >{{ organisation?.email }}</a
              >
            </p>
          </div>
        </div>
        <!-- End Body -->
      </div>
    } @else {
      <div
        class="relative flex flex-col shadow-lg rounded-xl pointer-events-auto "
      >
        <div
          class="relative overflow-hidden min-h-32 text-center rounded-t-xl dark:bg-slate-700 bg-slate-300"
        >
          <!-- SVG Background Element -->
          <figure class="absolute inset-x-0 bottom-0 -mb-px">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 1920 100.1"
            >
              <path
                fill="currentColor"
                class="fill-background"
                d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
              ></path>
            </svg>
          </figure>
          <!-- End SVG Background Element -->
        </div>

        <div class="relative z-10 -mt-12 ">
          <!-- Icon -->
          <span
            class="mx-auto flex justify-center items-center size-[62px] rounded-full border bg-background"
          >
            <svg
              class="shrink-0 size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"
              />
              <path
                d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </span>
          <!-- End Icon -->
        </div>

        <!-- Body -->
        <div class="p-4 sm:p-7 overflow-y-auto">
          <div class="text-center">
            <h3 id="hs-ai-modal-label" class="text-lg font-semibold ">
              {{ organisation?.name }}
            </h3>
            <p class="text-sm ">Invoice #{{ invoiceData?.memberPlan?.id }}</p>
          </div>

          <!-- Grid -->
          <div class="mt-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
            <div>
              <span class="block text-xs uppercase text-muted-foreground"
                >Amount paid:</span
              >
              <display-currency
                [amount]="invoiceData?.plan?.amount || 0"
                class="font-semibold text-sm"
              />
            </div>
            <!-- End Col -->

            <div>
              <span class="block text-xs uppercase text-muted-foreground"
                >Date paid:</span
              >
              <span class="block text-sm font-medium ">{{
                invoiceData?.memberPlan?.startDate | date: 'mediumDate'
              }}</span>
            </div>
            <!-- End Col -->

            <div>
              <span class="block text-xs uppercase text-muted-foreground"
                >End Date:</span
              >
              <span class="block text-sm font-medium ">{{
                invoiceData?.memberPlan?.endDate | date: 'mediumDate'
              }}</span>
            </div>
            <!-- End Col -->
          </div>
          <!-- End Grid -->

          <div class="mt-5 sm:mt-10">
            <h4 class="text-xs font-semibold uppercase ">Summary</h4>

            <ul class="mt-3 flex flex-col">
              <li
                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm border  -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg "
              >
                <div class="flex items-center justify-between w-full">
                  <span>Amount</span>
                  <display-currency
                    [amount]="invoiceData?.plan?.amount || 0"
                    class="font-normal text-sm"
                  />
                </div>
              </li>
              <li
                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm border  -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg "
              >
                <div class="flex items-center justify-between w-full">
                  <span>Period</span>
                  <p>{{ invoiceData?.plan?.periodInMonths }} Months</p>
                </div>
              </li>
              <li
                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold  border  -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg"
              >
                <div class="flex items-center justify-between w-full">
                  <span>Amount paid</span>
                  <display-currency
                    [amount]="invoiceData?.plan?.amount || 0"
                    class="font-semibold text-sm"
                  />
                </div>
              </li>
            </ul>
          </div>

          <!-- Button -->
          <div class="mt-5 flex justify-end gap-x-2">
            <mx-button class="gap-2" (handleClick)="generatePDF()">
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Invoice PDF
            </mx-button>
          </div>
          <!-- End Buttons -->

          <div class="mt-5 sm:mt-10">
            <p class="text-sm ">
              If you have any questions, please contact us at

              <a
                class="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2  focus:outline-none focus:underline font-medium dark:text-blue-500"
                >{{ organisation?.email }}</a
              >
            </p>
          </div>
        </div>
        <!-- End Body -->
      </div>
    }
  </mx-dialog-content>`,
})
export class ViewInvoiceComponent implements OnInit {
  constructor(@Inject(DIALOG_DATA) private data: { memberID: number }) {}

  private api = inject(ApiService);
  private user = inject(UserService);

  invoiceData: MemberPlanDetail | null = null;
  downloadPDF = false;
  organisation$ = this.user.organisation$;

  ngOnInit(): void {
    this.api
      .get<MemberPlanDetail>(`/member/active-membership/${this.data.memberID}`)
      .subscribe((result) => {
        this.invoiceData = result.data;
      });
  }

  protected generatePDF() {
    this.downloadPDF = true;
    setTimeout(() => {
      const element = document.getElementById('print-section'); // Replace with your element's ID

      html2canvas(element!, {
        scale: 3,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(
          imgData,
          'PNG',
          0,
          0,
          pdfWidth,
          pdfHeight,
          undefined,
          'SLOW',
        );
        pdf.save('download.pdf');
        this.downloadPDF = false;
      });
    }, 0);
  }
}
