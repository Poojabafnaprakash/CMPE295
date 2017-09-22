import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { UserComponent } from '../user/user.component';
import { TablesComponent } from '../tables/tables.component';
import { MapsComponent } from '../maps/maps.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { DashboardComponent } from '../dashboard/dashboard.component';



const routes: Routes =[
    { path: 'home',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'dashboard',  component: DashboardComponent },
    //{ path: 'hi',  component: LandingPageComponent },
    //{ path: 'home',  component: LandingPageComponent },
    //{ path: '',          redirectTo: 'hi', pathMatch: 'full' }
    { path: '',          component: LandingPageComponent, pathMatch: 'full' }
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
