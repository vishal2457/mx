import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as echarts from 'echarts';
import { ApiService } from '../../../shared/services/api.service';
import { safeParseInt } from '../../../shared/utils/safe-parse-int';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);

  mockItem = {
    id: 1,
    name: 'John Doe',
    pinCode: 890102,
    value: 1000,
    recieved: new Date(),
  };
  mock = new Array(10).fill(this.mockItem);
  private readonly MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  timefilter = new FormControl('last 7 days');
  newCustomerByMonthCount = 0;
  revenueThisMonth = 0;
  openEnquiries = 0;
  memberCount = 0;
  totalRevenueForLastSevenMonths = 0;

  ngOnInit(): void {
    this.renderLineChart();
    this.newCustomerByMonth();
    this.fetchRevenueThisMonth();
    this.fetchOpenEnquiryCount();
    this.fetchMemberCount();
    this.fetchLastSevenMonthRevenue();
  }

  renderBarChart(data: number[], months: string[]) {
    const option = {
      tooltip: {},
      xAxis: {
        data: months,
        splitLine: { show: false },
        axisLine: { show: true },
        axisTick: { show: false },
        axisLabel: { show: true },
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: { show: true },
        axisTick: { show: false },
        axisLabel: { show: true },
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
          },
          data,
        },
      ],
    };
    const myChart = echarts.init(document.getElementById('bar-chart'));
    myChart.setOption(option);
  }

  renderLineChart() {
    const lineChartOptions = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [...Array(7).keys()].map((x) => x++),
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      series: [
        {
          name: 'July',
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {
            opacity: 0.5,
          },
          data: [...Array(7).keys()].map((x) =>
            Math.floor(Math.random() * 600),
          ),
        },
        {
          name: 'August',
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {
            opacity: 0.5,
          },
          data: [...Array(7).keys()].map((x) =>
            Math.floor(Math.random() * 600),
          ),
        },
      ],
    };
    const lineChart = echarts.init(document.getElementById('line-chart'));
    lineChart.setOption(lineChartOptions);
  }

  private newCustomerByMonth() {
    const currentDate = new Date();
    this.api
      .get<{ count: number }>('/member/count-new-by-month', {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      })
      .subscribe((data) => {
        this.newCustomerByMonthCount = data.data.count;
      });
  }

  private fetchRevenueThisMonth() {
    const currentDate = new Date();
    this.api
      .get<{ amount: number }>('/member/revenue-by-month', {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      })
      .subscribe((data) => {
        if (data?.data?.amount) {
          this.revenueThisMonth = data.data.amount;
        }
      });
  }

  private fetchOpenEnquiryCount() {
    this.api
      .get<{ count: number }>('/enquiry/count-status-open')
      .subscribe((data) => {
        this.openEnquiries = data.data.count;
      });
  }

  private fetchMemberCount() {
    this.api
      .get<{ count: number }>('/member/count')
      .subscribe((data) => (this.memberCount = data.data.count));
  }

  private fetchLastSevenMonthRevenue() {
    this.api
      .get<
        Array<{
          month: string;
          totalAmount: number;
        }>
      >('/member/last-n-month-revenue')
      .subscribe((result) => {
        const data = result.data
          .map((item) => {
            const amount = safeParseInt(item.totalAmount);
            this.totalRevenueForLastSevenMonths =
              this.totalRevenueForLastSevenMonths + amount;
            return amount;
          })
          .reverse();
        const months = result.data
          .map(
            (item) => this.MONTHS[new Date(item.month).getMonth().toString()],
          )
          .reverse();

        this.renderBarChart(data, months);
      });
  }
}
