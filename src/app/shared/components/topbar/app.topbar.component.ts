import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../layout/app.layout.service';
import { AppSidebarComponent } from '../sidebar/app.sidebar.component';
import { AuthService } from '@core/services/auth.service';
import {
  ConfirmationService,
  MenuItem,
  MenuItemCommandEvent,
} from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent implements OnInit {
  menuItems: MenuItem[] | undefined;
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
  activeItem!: number;
  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-fw pi-sign-out mr-2',
            command: (e: MenuItemCommandEvent) =>
              this.confirmLogout(e.originalEvent),
          },
        ],
      },
    ];
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onSidebarButtonClick() {
    this.layoutService.showSidebar();
  }

  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }
  resetCredentials() {
    this.authService.removeCurrentUser();
  }

  redirectLoginPage() {
    this.router.navigate(['/auth']);
  }
  confirmLogout(event: Event | undefined) {
    this.confirmationService.confirm({
      key: 'confirmLogout',
      target: event?.target || new EventTarget(),
      message: '¿Seguro que deseas cerrar sesión?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.resetCredentials();
        this.redirectLoginPage();
      },
    });
  }

  onSettingsClick(event: Event): void {
    // Mostrar mensaje en la consola
  }
}
