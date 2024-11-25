import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppConfigModule } from '../config/app.config.module';
import { PrimeCustomModule } from '@shared/prime-custom.module';

import { AppMenuComponent } from '../menu/app.menu.component';
import { AppMenuitemComponent } from '../menu/app.menuitem.component';
import { AppBreadcrumbComponent } from '../breadcrumb/app.breadcrumb.component';
import { AppSidebarComponent } from '../sidebar/app.sidebar.component'; 
import { AppTopbarComponent } from '../topbar/app.topbar.component'; 
import { AppProfileSidebarComponent } from '../profilesidebar/app.profilesidebar.component'; 
import { AppLayoutComponent } from './app.layout.component';



@NgModule({
    declarations: [
        AppLayoutComponent,
        AppBreadcrumbComponent,
        AppSidebarComponent,
        AppTopbarComponent,
        AppProfileSidebarComponent,
        AppMenuComponent,
        AppMenuitemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PrimeCustomModule,
        BrowserAnimationsModule,
        RouterModule,
        AppConfigModule,
    ],
    exports: [
        AppLayoutComponent
    ]
})
export class AppLayoutModule {}
