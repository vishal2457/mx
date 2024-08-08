import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { RoleFormComponent } from './role-form/role-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import {
  TRole,
  TRolePermission,
} from '../../../../../../../libs/mx-schema/src';
import { MENU_DATA } from '../../../shared/constants/menu-contstant';
import { PERMISSIONS } from '../../../shared/constants/permissions.constants';

@Component({
  selector: 'edit-role',
  template: `
    <page-header header="Edit Role">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <role-form />
    <p class="text-2xl mt-4 mb-2 font-semibold">Permissions</p>
    <table class="text-sm border-collapse">
      <thead class="border-b">
        <th class="text-left">Menu</th>
        <th class="px-4  ">
          <span class="pr-2">View</span>
          <input
            type="checkbox"
            (change)="checkAllView($event)"
            class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </th>
        <th class="px-4  ">
          <span class="pr-2">Create</span>
          <input
            type="checkbox"
            (change)="checkAllCreate($event)"
            class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </th>
        <th class="px-4  ">
          <span class="pr-2">Update</span>
          <input
            type="checkbox"
            (change)="checkAllUpdate($event)"
            class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </th>
      </thead>
      <tbody>
        @for (m of menu; track m.link) {
          <tr>
            <td class="py-2">{{ m.name }}</td>
            <td class="text-center">
              <input
                type="checkbox"
                [(ngModel)]="m.view"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </td>
            <td class="text-center">
              <input
                type="checkbox"
                [(ngModel)]="m.create"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </td>
            <td class="text-center">
              <input
                type="checkbox"
                [(ngModel)]="m.update"
                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class UpdateRoleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(RoleFormComponent) roleFormComponent!: RoleFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  roleID!: number;
  roleForm!: FormGroup;
  menu: any[] = Array.from(MENU_DATA);
  private requests = new SubSink();

  ngOnInit(): void {
    this.roleID = parseInt(this.route.snapshot.params['id']);
    this.fetchRoleDetails(this.roleID);
  }

  ngAfterViewInit(): void {
    this.roleForm = this.roleFormComponent.roleForm;
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  checkAllView(e) {
    this.menu = this.menu.map((item) => {
      return { ...item, [PERMISSIONS.VIEW]: e.target.checked };
    });
  }

  checkAllCreate(e) {
    this.menu = this.menu.map((item) => {
      return { ...item, [PERMISSIONS.CREATE]: e.target.checked };
    });
  }

  checkAllUpdate(e) {
    this.menu = this.menu.map((item) => {
      return { ...item, [PERMISSIONS.UPDATE]: e.target.checked };
    });
  }

  handleSubmit() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }

    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Role',
      id: 'update-role',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/role/update/${this.roleID}`, {
        ...this.roleForm.value,
        permissions: this.getPermissionPayload(),
      })
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Role updated',
            id: 'update-role',
            type: 'success',
          });
          window.location.reload();
        },
      });
  }

  private getPermissionPayload() {
    return this.menu.reduce((acc, curr) => {
      if (
        curr[PERMISSIONS.VIEW] ||
        curr[PERMISSIONS.CREATE] ||
        curr[PERMISSIONS.UPDATE]
      ) {
        const base = {
          menuName: curr.name,
          roleID: this.roleID,
        };

        if (curr[PERMISSIONS.VIEW]) {
          base['permission'] = PERMISSIONS.VIEW;
          acc.push({ ...base });
        }

        if (curr[PERMISSIONS.CREATE]) {
          base['permission'] = PERMISSIONS.CREATE;
          acc.push({ ...base });
        }

        if (curr[PERMISSIONS.UPDATE]) {
          base['permission'] = PERMISSIONS.UPDATE;
          acc.push({ ...base });
        }
      }
      return acc;
    }, []);
  }

  private fetchRoleDetails(id: number) {
    this.api
      .get<
        { role: TRole; rolePermission: TRolePermission }[]
      >(`/role/detail/${id}`)
      .subscribe(({ data }) => {
        this.roleForm.patchValue(data[0].role);
        this.menu = this.menu.map((item) => {
          const permissions = data
            .filter((i) => i.rolePermission.menuName === item.name)
            .map((i) => i.rolePermission.permission);
          return {
            ...item,
            [PERMISSIONS.VIEW]: permissions.includes(PERMISSIONS.VIEW),
            [PERMISSIONS.CREATE]: permissions.includes(PERMISSIONS.CREATE),
            [PERMISSIONS.UPDATE]: permissions.includes(PERMISSIONS.UPDATE),
          };
        });
      });
  }
}
