import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AppLayoutComponent } from '@shared/components/layout/app.layout.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'posts',
        data: {
          breadcrumb: { icon: 'pi pi-fw pi-home', label: 'Listado de posts' }
        },
        loadChildren: () =>
          import('@modules/posts/posts.module').then(
            (m) => m.PostsModule
          ),
      },
      {
        path: '**',
        redirectTo: 'posts',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
