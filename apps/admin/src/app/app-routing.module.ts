import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { authGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule,
      ),
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/analytics',
        pathMatch: 'full',
      },
      {
        path: 'notification',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/notification/notification.module').then(
            (m) => m.NotificationModule,
          ),
      },
      {
        path: 'role',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'user',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'analytics',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/analytics/analytics.module').then(
            (m) => m.AnalyticsModule,
          ),
      },
      {
        path: 'organisation',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/organisation/organisation.module').then(
            (m) => m.OrganisationModule,
          ),
      },
      {
        path: 'plan',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/plan/plan.module').then((m) => m.PlanModule),
      },
      {
        path: 'member',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/member/member.module').then((m) => m.MemberModule),
      },
      {
        path: 'workout-template',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/workout-template/workout-template.module').then(
            (m) => m.WorkoutTemplateModule,
          ),
      },
      {
        path: 'exercise',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/exercise/exercise.module').then(
            (m) => m.ExerciseModule,
          ),
      },
      {
        path: 'enquiry',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/enquiry/enquiry.module').then(
            (m) => m.EnquiryModule,
          ),
      },
      {
        path: 'member-plan',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/member-plan/member-plan.module').then(
            (m) => m.MemberplanModule,
          ),
      },
      // APPEND ANGULAR ROUTES
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
