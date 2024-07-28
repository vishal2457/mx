import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TMember } from '../../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../../shared/services/api.service';
import { MxNotification } from '../../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../../shared/utils/sub-sink';
import { MemberFormComponent } from '../member-form/member-form.component';
import { Dialog } from '@angular/cdk/dialog';
import { AddMembershipDialogComponent } from '../../components/add-membership.component';
import { MxGridShellComponent } from '../../../../shared/grid-shell/grid-shell';
import { calculateBMI } from '../../../../../../../../libs/helpers/src';
import * as echarts from 'echarts';

@Component({
  selector: 'edit-member',
  templateUrl: './update-member.component.html',
})
export class UpdateMemberComponent implements OnInit, OnDestroy {
  @ViewChild(MemberFormComponent) memberFormComponent!: MemberFormComponent;
  @ViewChild(MxGridShellComponent, { static: false })
  gridShell!: MxGridShellComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(Dialog);

  memberID!: string;
  memberData: (TMember & { bmi: string }) | undefined;
  totalSpent!: number;
  private requests = new SubSink();
  private subs = new SubSink();

  ngOnInit(): void {
    // this.renderBmiChart();
    this.memberID = this.route.snapshot.params['id'];
    this.fetchMemberDetails(this.memberID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
    this.subs.unsubscribe();
  }

  private renderBmiChart() {
    const option = {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 2,
              color: [
                [18.5, '#67e0e3'],
                [25, '#37a2da'],
                [40, '#fd666d'],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          splitLine: {
            distance: -60,
            length: 10,
            lineStyle: {
              color: '#fff',
              width: 4,
            },
          },
          axisLabel: {
            color: 'inherit',
            distance: 40,
            fontSize: 5,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}',
            color: 'inherit',
            fontSize: 15,
          },
          data: [
            {
              value: 21.75,
            },
          ],
        },
      ],
    };
    const myChart = echarts.init(document.getElementById('bmi-gauge'));
    myChart.setOption(option);
  }

  private fetchMemberDetails(id: string) {
    this.api
      .get<{
        details: TMember & { memberPlan: any[] };
        memberTotalSpent: { amount: string };
      }>(`/member/${id}`)
      .subscribe(({ data }) => {
        const details = data.details;
        this.memberData = {
          ...details,
          bmi: calculateBMI(details.height || 0, details.weight || 0).toFixed(
            2,
          ),
        };
        this.memberFormComponent.patchValue(details);
        this.totalSpent = parseFloat(data.memberTotalSpent?.amount);
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

  openAddNewMemberShip() {
    const ref = this.dialog.open(AddMembershipDialogComponent, {
      data: {
        memberID: this.memberData?.id,
        email: this.memberData?.email,
      },
    });

    this.subs.sink = ref.closed.subscribe((result: any) => {
      if (result.refresh) {
        this.gridShell.refresh();
      }
    });
  }
}
