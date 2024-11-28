import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '@modules/posts/models/post';
import { PostRequest } from '@modules/posts/models/post-request';
import { Tag } from '@modules/posts/models/tag';
import { CategoryService } from '@modules/posts/services/category.service';
import { PostService } from '@modules/posts/services/post.service';
import { TagService } from '@modules/posts/services/tag.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: false,
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;


  public image: any = null;
  public objectURL: string = '';
  public tags: any[] = [];
  public tagsList: string[] = [];
  public categories: any[] = [];
  public postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private createPostref: DynamicDialogRef,
    private tagService: TagService,
    private categoryService: CategoryService,
    private postService: PostService) {

    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      content: ['', [Validators.required]],
      tags: [null, [Validators.required]],
      imageBase64: [null, [Validators.required]],
      category: [null,  [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.initialize();
  }
  private initialize(): void {
    this.loadData();
  }
  private loadData(): void{
    this.loadCategories();
    this.loadTags();
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = file;
        this.objectURL = reader.result as string;
        this.postForm.patchValue({ imageBase64: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error('El archivo seleccionado no es una imagen válida.');
    }
  }
  removeImage(): void {
    this.image = null;
    this.objectURL = '';
    this.postForm.patchValue({ imageBase64: null });
  }

  submitPost(): void {
    if (this.postForm.valid) {
      const data = this.postForm.value;
      const post: PostRequest = this.formatData(data);

      this.postService.create(post).subscribe(
        (response) => {
          this.postForm.reset();
          this.tags = [];
          this.image = null;
          this.objectURL = '';
          this.createPostref.close(true);
        },
        (error) => {
          console.error('Error al guardar el post:', error);
        }
      );
    } else {
      console.error('Formulario inválido. Por favor, revisa los campos.');
    }
  }
  private formatData(data: any): PostRequest {
    const tags: number[]  = this.extractIds(data.tags);
    const post: PostRequest = {
      title: data.title,
      description: data.description,
      content: data.content,
      frontpage: data.imageBase64,
      tags: tags,
      categoryId: data.category.id,
      userId: 1
    };
    return post;
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
  public handleTags(event: any){
    const selectedTags: Tag[] = event.value;
    this.tagsList = selectedTags.map(tag => tag.name);
  }
  public handleTagsClear(event: any){
    this.postForm.patchValue({
      tags: [],
    });
    this.tagsList = [];
  }
  private extractIds(items: any[]): number[] {
    return items?.map(item => item.id) || [];
  }
}
