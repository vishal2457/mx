import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatchFormComponent } from './match-form/match-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TMatch } from '../../../../../../../libs/mx-schema/src';
import { safeStringify } from '../../../shared/utils/safe-json';

@Component({
  selector: 'edit-items',
  template: ` <page-header
      header="Edit Match"
      (save)="handleSubmit()"
      [loading]="false"
    />
    <match-form />`,
})
export class UpdateMatchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatchFormComponent) formComponent!: MatchFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);
  route = inject(ActivatedRoute);
  router = inject(Router);

  matchID!: string;
  matchForm!: FormGroup;
  private requests = new SubSink();

  ngOnInit(): void {
    this.matchID = this.route.snapshot.params['id'];
    this.fetchMatchDetails(this.matchID);
  }

  ngAfterViewInit(): void {
    this.matchForm = this.formComponent.matchForm;
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchMatchDetails(id: string) {
    this.api.get<TMatch>(`/match/${id}`).subscribe(({ data }) => {
      this.formComponent.previousFilenames = {
        teamOneLogo: data.teamOneLogo,
        teamTwoLogo: data.teamTwoLogo,
        h2hTeamImage: data.h2hTeamImage,
        premiumTeamImage: data.premiumTeamImage,
      };
      this.formComponent.matchForm.patchValue(data);
    });
  }

  handleSubmit() {
    if (this.formComponent.matchForm.invalid) {
      this.formComponent.showErrors = true;
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Match',
      id: 'update-match',
      type: 'loading',
    });

    const formData = new FormData();
    for (const key in this.formComponent.matchForm.controls) {
      formData.append(key, this.matchForm.value[key]);
    }

    formData.append(
      'previousFiles',
      safeStringify(this.formComponent.previousFilenames)
    );

    this.requests.sink = this.api
      .put(`/match/${this.matchID}`, formData)
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Match updated',
            id: 'update-match',
            type: 'success',
          });
          this.router.navigate(['/match/list']);
        },
      });
  }
}
