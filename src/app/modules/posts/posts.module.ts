import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeCustomModule } from '@shared/prime-custom.module';
import { PostsRoutingModule } from './posts-routing.module';

import { PostsComponent } from './posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { ListCardPostComponent } from './components/list-card-post/list-card-post.component';

@NgModule({
  declarations: [
    PostsComponent,
    CreatePostComponent,
    DetailPostComponent,
    ListCardPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeCustomModule,
    PostsRoutingModule,
  ]
})
export class PostsModule {}
