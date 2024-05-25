import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TOffer } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-offer',
  template: ` <page-header
      header="Edit Offer"
      (save)="handleSubmit()"
      [loading]="false"
    />
    <offer-form />`,
})
export class UpdateOfferComponent implements OnInit, OnDestroy {
  @ViewChild(OfferFormComponent)
  offerFormComponentComponent!: OfferFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  offerID!: string;
  private requests = new SubSink();

  ngOnInit(): void {
    this.offerID = this.route.snapshot.params['id'];
    this.fetchOfferDetails(this.offerID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchOfferDetails(id: string) {
    this.api.get<TOffer>(`/offer/${id}`).subscribe(({ data }) => {
      this.offerFormComponentComponent.patchValue(data);
    });
  }

  handleSubmit() {
    if (this.offerFormComponentComponent.isInValid()) {
      this.offerFormComponentComponent.showErrors = true;
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Offer',
      id: 'update-offer',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(
        `/offer/update/${this.offerID}`,
        this.offerFormComponentComponent.getFormValue()
      )
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Offer updated',
            id: 'update-offer',
            type: 'success',
          });
          this.router.navigate(['/offer/list']);
        },
      });
  }
}
