import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentProjectComponent } from './child-components/current-project/current-project.component';
import { AnalyticsComponent } from './child-components/analytics/analytics.component';
import { FinanceComponent } from './child-components/finance/finance.component';
import { UpcomingProjectComponent } from './child-components/upcoming-project/upcoming-project.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const routes: Routes = [
  { path: '', redirectTo: 'current-project', pathMatch: 'full' },
  { path: 'current-project', component: CurrentProjectComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'upcoming-project', component: UpcomingProjectComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgApexchartsModule,
    BsDatepickerModule,
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
