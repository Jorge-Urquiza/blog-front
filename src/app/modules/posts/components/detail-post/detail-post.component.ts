import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '@modules/posts/models/post';
import { PostService } from '@modules/posts/services/post.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  standalone: false,
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrl: './detail-post.component.scss'
})
export class DetailPostComponent implements OnInit {
  public id!: number;
  public post!: Post;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam ? parseInt(idParam, 10) : 0;
    });
  }
  ngOnInit(): void {
    this.initialize();
  }
  private initialize(){
    this.getPostById(this.id);
  }

  private getPostById(id: number){
    this.postService.getPostById(id).subscribe( post => {
      this.post = post;
    })
  }
  public handleDeletePost(event: Event): void{
    this.confirmationService.confirm({
      key: 'deleteConfirmationDialog',
      target: event.target as EventTarget,
      message: '¿Estás seguro(a) de que quieres eliminar este post?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-sucess p-button-text',
      rejectButtonStyleClass: 'p-button-danger p-button-text',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      defaultFocus: 'none',
      accept: () => {
        this.deletePost();
      },
      reject: () => {},
    });
  }

  private deletePost(): void{
    this.postService.delete(this.post.id).subscribe( async (response) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Post eliminado exitosamente',
      });
      await this.sleep(5000);
      this.router.navigate(['/posts']);
    })
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
