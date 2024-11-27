import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@modules/posts/models/post';

@Component({
  standalone: false,
  selector: 'app-list-card-post',
  templateUrl: './list-card-post.component.html',
})
export class ListCardPostComponent {
  @Input() post!: Post;

  constructor(private router: Router) {}

  navigateToDetail(): void {
    this.router.navigateByUrl('/apps/blog/detail');
  }
}
