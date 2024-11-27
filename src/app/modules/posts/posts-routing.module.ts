import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'create',
    component: CreatePostComponent,
  },
  {
    path: 'edit/:id',
    component: EditPostComponent,
  },
  {
    path: 'detail/:id',
    component: DetailPostComponent,
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule { }
