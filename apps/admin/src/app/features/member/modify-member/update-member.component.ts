import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TMember } from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { MemberFormComponent } from './member-form/member-form.component';

@Component({
  selector: 'edit-member',
  template: ` <page-header [header]="'Edit Member' + ' #' + memberID">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <member-form
      formType="update"
      [memberPlan]="memberPlan"
      [memberData]="memberData"
    />`,
})
export class UpdateMemberComponent implements OnInit, OnDestroy {
  @ViewChild(MemberFormComponent) memberFormComponent!: MemberFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  memberID!: string;
  memberPlan: any[] = [];
  memberData!: TMember;
  private requests = new SubSink();

  ngOnInit(): void {
    this.memberID = this.route.snapshot.params['id'];
    this.fetchMemberDetails(this.memberID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchMemberDetails(id: string) {
    this.api
      .get<TMember & { memberPlan: any[] }>(`/member/${id}`)
      .subscribe(({ data }) => {
        const { memberPlan, ...rest } = data;
        this.memberFormComponent.patchValue(rest);
        this.memberPlan = memberPlan;
        this.memberData = rest;
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
