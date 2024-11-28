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
    const url = ['/detail', this.post.id];
    console.log('Navegando a:', url);
    this.router.navigate(['/posts/detail', this.post.id]);
  }
  public getRandomNumber(): number {
    const min: number = 0;
    const max: number = 10;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
