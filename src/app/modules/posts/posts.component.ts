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
  sortOptions: SelectItem[] = [
    { label: 'Most Shared', value: 'share' },
    { label: 'Most Commented', value: 'comment' },
  ];
  public categories: Category[] = [];
  public tags: any[] = [];
  layout: string = 'list';
  sortField: string = '';

  totalPosts: Post[] = [
    {
      coverImage: 'assets/demo/images/blog/blog-1.png',
      profile: 'assets/demo/images/avatar/circle/avatar-f-1.png',
      title: 'Blog',
      description:
        'Ornare egestas pellentesque facilisis in a ultrices erat diam metus integer sed',
      comment: 2,
      share: 7,
      day: '15',
      month: 'October',
    }
  ];

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
    this.getPostsWithFilters([1], [1]);
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
    this.loadFilterData();
    this.getPostsWithFilters([1], [1]);
  }
  private getPostsWithFilters(categories: number[], tags: number[]): void {
    this.postService.getPostsWithFilters(categories, tags).subscribe((posts) => {
      this.totalPosts = posts
    });
  }
  public onSearch(): void {
    if (this.filterForm.valid) {
      const filters = this.filterForm.value;
      console.log('Filtros seleccionados:', filters);
    }
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
        // this.resetFilters();
        // const params = this.getParamsForFilters();
        // this.getProfessionalContracts(this.contractorCompanyId, params);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito!',
          detail: 'Post creado exitosamente!',
        });
      } else {
      }
    });

  }
}
