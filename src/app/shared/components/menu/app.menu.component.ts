import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  public model: any[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Techtalk app',
        icon: 'pi pi-trash',
        items: [
          {
            label: 'Listado de posts',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/posts'],
          },
          {
            label: 'Gestionar categorias',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/categories'],
          },
          {
            label: 'Gestionar etiquetas',
            icon: 'pi pi-fw pi-paperclip',
            routerLink: ['/tags'],
          },
        ],
      },
    ];
  }
}
