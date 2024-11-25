import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManagementService } from '@modules/mandatory-requirements/services/management.service';
import { PrimeCustomModule } from '@shared/prime-custom.module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-position-form',
  templateUrl: './new-position-form.component.html',
  styleUrl: './new-position-form.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, PrimeCustomModule],
})
export class NewPositionFormComponent implements OnInit {
  public form!: FormGroup;

  public isAdding: boolean = false;
  public isLoading: boolean = false;

  @Input()
  public principalId?: number;

  @Input()
  public disabled: boolean = true;

  @Output()
  public positionCreated = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private managementService: ManagementService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-ZÀ-ú ()/\\-_]*$'),
        ],
      ],
    });
  }

  public hasError(field: any, error: string) {
    const fieldControl = this.form.get(field);
    return !!(
      fieldControl &&
      fieldControl.touched &&
      fieldControl.hasError(error)
    );
  }

  // Handlers
  public handleFormSubmit() {
    const value = this.form.value;
    // const positionName = value.positionName.trim();
    // const principalId = this.principal?.value?.id;

    // TODO: Agregar validación de mandante
    if (!this.principalId) {
      console.error('No tiene principalId', this.principalId);
      // this.markPrincipalAsTouched();
      this.showErrorMessage('Debe seleccionar un mandante primero');
      return;
    }

    const body = {
      name: value.name,
      principalId: this.principalId,
    };
    this.savePosition(body);
  }

  private showErrorMessage(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error:',
      detail: detail,
    });
  }

  handleShowFormButtonClick(): void {
    this.form.reset();
    this.isAdding = true;
  }

  public handleCancelButtonClick() {
    this.isAdding = false;
    this.form.reset();
  }

  // API calls
  private savePosition(body: any) {
    this.isLoading = true;
    this.managementService.savePosition(body).subscribe({
      next: (response) => {
        console.log(response);
        const positionResponse = response.data;
        const { principalId } = body;
        // this.refreshPositions(principalId);
        // this.position = positionResponse;
        this.isAdding = false;
        this.isLoading = false;
        this.positionCreated.emit(positionResponse)
      },
      error: (err) => {
        console.error('Error: ' + err);
        this.isLoading = false;
      },
    });
  }
}
