import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { LayoutService } from '@shared/components/layout/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  public loginForm: FormGroup;
  public isPasswordVisible: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private messageService: MessageService,
    private layoutService: LayoutService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  public hasError(field: any, error: string) {
    return field?.errors?.[error] && (field?.dirty || field?.touched);
  }

  handleFormSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const formValue = this.loginForm.value;
    this.isLoading = true;

    this.authService.login(formValue).subscribe({
      next: ({ data }) => {
        if (!data) {
          this.isLoading = false;
        } else {
          this.authService.setCurrentUser(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Sesión iniciada correctamente',
          });
          setTimeout(() => {
            this.redirectHomePage();
          }, 2000);
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error.message}`,
        });
        this.isLoading = false;
      },
    });
  }

  redirectHomePage() {
    this.router.navigate(['/blogs']);
  }
}
