import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TUser } from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'edit-user',
  template: ` <page-header header="Edit User">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <user-form />`,
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  userID!: string;
  private requests = new SubSink();

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['id'];
    this.fetchUserDetails(this.userID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchUserDetails(id: string) {
    this.api.get<TUser>(`/user/detail/${id}`).subscribe(({ data }) => {
      this.userFormComponent.patchValue({ email: data.email });
    });
  }

  handleSubmit() {
    if (this.userFormComponent.isInvalid()) {
      this.userFormComponent.validate();
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating User',
      id: 'update-user',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/user/update/${this.userID}`, this.userFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'User updated',
            id: 'update-user',
            type: 'success',
          });
          this.router.navigate(['/user/list']);
        },
      });
  }
}
