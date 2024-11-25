import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    public model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'PGT',
                icon: 'pi pi-trash',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/dashboard']
                    },
                    {
                        label: 'Trabajadores(as)',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/trabajadores']
                    },
                    {
                        label: 'Requerimientos mandantes',
                        icon: 'pi pi-fw pi-folder-open',
                        routerLink: ['/requerimientos']
                    },
                    {
                        label: 'Contratos comerciales',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/contratos']
                    },
                    {
                      label: 'Descargar reportes',
                      icon: 'pi pi-fw pi-download',
                      routerLink: ['/reportes']
                  }
                ]
            },

        ];
    }
}
