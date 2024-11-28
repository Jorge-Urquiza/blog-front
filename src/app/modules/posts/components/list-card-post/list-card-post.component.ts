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
  public randomComments: number;
  public randomShares: number;

  constructor(private router: Router) {
    this.randomComments = this.getRandomNumber(1, 10);
    this.randomShares = this.getRandomNumber(0, 5);
  }

  navigateToDetail(): void {
    const url = ['/detail', this.post.id];
    this.router.navigate(['/posts/detail', this.post.id]);
  }
  public getRandomNumber(min: number, max: number ): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
