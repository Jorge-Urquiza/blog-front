import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Post } from './models/post';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from './services/category.service';
import { TagService } from './services/tag.service';
import { Tag } from './models/tag';
import { Category } from './models/category';
import { PostService } from './services/post.service';

@Component({
  standalone: false,
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  public filterForm!: FormGroup;
  public createPostref: DynamicDialogRef | undefined;
  public categories: Category[] = [];
  public tags: any[] = [];
  layout: string = 'list';
  sortField: string = '';

  totalPosts: Post[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }
  private initialize(): void {
    this.filterForm = this.formBuilder.group({
      categories: [[]],
      tags: [[]],
    });
    this.loadFilterData();
    this.getPostsWithFilters(null, null);
  }

  private loadFilterData(): void{
    this.loadCategories();
    this.loadTags();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private loadTags(): void {
    this.tagService.getTags().subscribe((tags) => {
      this.tags = tags;
    });
  }

  private resetFilters(): void {
    this.filterForm.reset();
  }
  private getPostsWithFilters(categories: number[] | null, tags: number[] | null): void {
    this.postService.getPostsWithFilters(categories, tags).subscribe({
      next: (posts) => {
        this.totalPosts = posts;
      },
      error: (error) => {
        this.totalPosts = [];
      }
    });
  }
  public onSearch(): void {
    if (this.filterForm.invalid) {
      return;
    }

    const filters = this.filterForm.value;
    const categoriesOrNull = this.formatFilterToNullIfEmpty(filters.categories);
    const tagsOrNull = this.formatFilterToNullIfEmpty(filters.tags);

    this.getPostsWithFilters(categoriesOrNull, tagsOrNull);
  }

  private formatFilterToNullIfEmpty(filter: any[]): number[] | null {
    const ids = this.extractIds(filter);
    return ids.length === 0 ? null : ids;
  }
  private extractIds(items: any[]): number[] {
    return items?.map(item => item.id) || [];
  }
  public handleCreatePost(): void{
    this.createPostref = this.dialogService.open(CreatePostComponent, {
      header: 'Crear nuevo post',
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
    this.createPostref.onClose.subscribe((some) => {
      if (some) {
        this.resetFilters();
        this.getPostsWithFilters(null, null);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito!',
          detail: 'Post creado exitosamente!',
        });
      }
    });

  }
}
