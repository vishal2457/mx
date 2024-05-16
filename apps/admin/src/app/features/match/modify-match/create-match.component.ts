import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { MatchFormComponent } from './match-form/match-form.component';

@Component({
  selector: 'add-items',
  template: `<page-header
      header="Add Match"
      (save)="handleSubmit()"
      [loading]="false"
    />
    <match-form />`,
})
export class CreateMatchComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatchFormComponent) MatchFormComponent!: MatchFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);
  router = inject(Router);

  matchForm!: FormGroup;
  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  ngAfterViewInit(): void {
    this.matchForm = this.MatchFormComponent.matchForm;
  }

  handleSubmit() {
    if (this.matchForm.invalid) {
      this.MatchFormComponent.showErrors = true;
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Match',
      id: 'add-match',
      type: 'loading',
    });

    const formData = new FormData();
    for (const key in this.matchForm.controls) {
      formData.append(key, this.matchForm.value[key]);
    }

    this.addRequests.sink = this.api.post('/match', formData).subscribe({
      next: () => {
        this.matchForm.reset();
        this.router.navigate(['/']);
        this.notif.updateToast({
          text: 'Match added',
          id: 'add-match',
          type: 'success',
        });
      },
    });
  }
}
