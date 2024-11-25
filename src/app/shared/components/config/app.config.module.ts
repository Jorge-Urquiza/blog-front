import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { SidebarModule } from 'primeng/sidebar';
// import { RadioButtonModule } from 'primeng/radiobutton';
// import { ButtonModule } from 'primeng/button';
// import { InputSwitchModule } from 'primeng/inputswitch';
import { AppConfigComponent } from './app.config.component';
import { PrimeCustomModule } from '@shared/prime-custom.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrimeCustomModule,
        
    ],
    declarations: [
        AppConfigComponent
    ],
    exports: [
        AppConfigComponent
    ]
})
export class AppConfigModule {}
