import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { MapsComponent } from './maps/maps.component';
import { TablesComponent } from './tables/tables.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard'

const routes: Routes =[
  {
  path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
      }
    ]
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        component: MapsComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'table',
        component: TablesComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
