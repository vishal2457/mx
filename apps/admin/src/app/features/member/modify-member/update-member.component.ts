import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MemberFormComponent } from './member-form/member-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TMember } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-member',
  template: ` <page-header header="Edit Member">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <member-form />`,
})
export class UpdateMemberComponent implements OnInit, OnDestroy {
  @ViewChild(MemberFormComponent) memberFormComponent!: MemberFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  memberID!: string;
  private requests = new SubSink();

  ngOnInit(): void {
    this.memberID = this.route.snapshot.params['id'];
    this.fetchMemberDetails(this.memberID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchMemberDetails(id: string) {
    this.api.get<TMember>(`/member/${id}`).subscribe(({ data }) => {
      this.memberFormComponent.patchValue(data);
    });
  }

  handleSubmit() {
    if (this.memberFormComponent.isInValid()) {
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Member',
      id: 'update-member',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(
        `/member/update/${this.memberID}`,
        this.memberFormComponent.getFormValue(),
      )
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Member updated',
            id: 'update-member',
            type: 'success',
          });
          this.router.navigate(['/member/list']);
        },
      });
  }
}
