import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { LayoutService } from '@shared/components/layout/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IStorageInterface } from '../interfaces/login.interface';

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
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async handleFormSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const formValue = this.loginForm.value;
    this.isLoading = true;
    await this.sleep(3000)
    this.isLoading = false;
    const payload = {
      id: 1,
      email: "jorge@test.com",
      token: 'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9'
    }
    this.authService.setCurrentUser(payload);
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Sesión iniciada correctamente',
    });

    setTimeout(() => {
      this.redirectHomePage();
    }, 2000);
  }

  redirectHomePage() {
    this.router.navigate(['/posts']);
  }
}
