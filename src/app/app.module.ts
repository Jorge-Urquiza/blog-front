import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'primeng/api';
import { AppLayoutModule } from '@shared/components/layout/app.layout.module';
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { authorizationInterceptor } from '@core/interceptors/authorization.interceptor';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';

// Registrar los datos de localización para "es"
registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AppLayoutModule, SharedModule],
  providers: [
    provideHttpClient(withInterceptors([authorizationInterceptor])),
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
