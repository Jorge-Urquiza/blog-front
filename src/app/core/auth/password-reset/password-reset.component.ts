import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';
import { PasswordResetRequestDto } from './models/password-reset-request.dto';
import { PasswordResetValidationDto } from './models/password-reset-validation.dto';
import { PasswordResetDto } from './models/password-reset.dto';
import { Subscription, interval, take, takeUntil } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { confirmPasswordValidator } from './validators/confirm-password.validator';
import { passwordValidator } from './validators/password.validator';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
  providers: [MessageService],
})
export class PasswordResetComponent {
  // email
  public step: number = 0;
  public isPasswordVisible: boolean = false;
  public isResendEmailEnabled: boolean = false;
  public isLoading: boolean = false;

  public emailForm: FormGroup;
  public verificationCodeForm: FormGroup;
  public passwordForm: FormGroup;

  private confirmationResponse?: PasswordResetDto = undefined;
  private finishDate: Date = new Date(Date.now() + 90 * 1000);
  private timer?: Subscription;
  public secondLeft: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.verificationCodeForm = this.formBuilder.group({
      value1: ['', [Validators.required]],
      value2: ['', [Validators.required]],
      value3: ['', [Validators.required]],
      value4: ['', [Validators.required]],
      value5: ['', [Validators.required]],
      value6: ['', [Validators.required]],
    });
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [passwordValidator]],
      confirmPassword: ['', [Validators.required]],
    });
    this.passwordForm.addValidators(confirmPasswordValidator);
  }

  get value1() {
    return this.verificationCodeForm.get('value1');
  }

  get value2() {
    return this.verificationCodeForm.get('value2');
  }

  get value3() {
    return this.verificationCodeForm.get('value3');
  }

  get value4() {
    return this.verificationCodeForm.get('value4');
  }

  get value5() {
    return this.verificationCodeForm.get('value5');
  }

  get value6() {
    return this.verificationCodeForm.get('value6');
  }

  get email() {
    return this.emailForm.get('email');
  }

  get code() {
    return this.verificationCodeForm.get('code');
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  // Handlers
  public handleEmailFormSubmit() {
    if (this.isLoading) return;
    if (this.emailForm.valid) {
      this.requestConfirmationCode();
    } else {
      this.emailForm.markAllAsTouched();
    }
  }

  public handleVerificationCodeForm() {
    if (this.isLoading) return;
    if (this.verificationCodeForm.valid) {
      this.validateConfirmationCode();
    } else {
      this.verificationCodeForm.markAllAsTouched();
    }
  }

  public handlePasswordForm() {
    if (this.isLoading) return;
    if (this.passwordForm.valid && this.confirmationResponse) {
      this.updatePassword();
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  // API calls
  private requestConfirmationCode() {
    const body = new PasswordResetRequestDto(this.email?.value);
    this.isLoading = true;
    this.apiService.requestPasswordReset(body).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Código enviado exitosamente',
        });
        this.step = 1;
        this.isLoading = false;
        this.resetTimer();
      },
      error: (error) => {
        // todo: to error handler
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.error,
        });
      },
    });
  }

  private validateConfirmationCode() {
    const code = [
      this.value1?.value,
      this.value2?.value,
      this.value3?.value,
      this.value4?.value,
      this.value5?.value,
      this.value6?.value,
    ].join('');
    const body = new PasswordResetValidationDto(this.email?.value, code);
    this.isLoading = true;
    this.apiService.validateConfirmationCode(body).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Código validado exitosamente',
        });
        this.confirmationResponse = response.data;
        this.step = 2;
        this.isLoading = false;
      },
      error: (error) => {
        // todo: to error handler
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.error,
        });
        this.isLoading = false;
      },
    });
  }

  public handleResendClick() {
    this.requestConfirmationCode();
  }

  private updatePassword() {
    const body = new PasswordResetDto(
      this.confirmationResponse!.userId,
      this.confirmationResponse!.privateCode,
      this.newPassword?.value
    );

    this.isLoading = true;
    this.apiService.updatePassword(body).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Contraseña actualizada correctamente',
        });
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 2000);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.error,
        });
        this.isLoading = false;
      },
    });
  }

  public hasError(field: any, error: string) {
    return field?.errors?.[error] && (field?.dirty || field?.touched);
  }

  public hasVerificationCodeError() {
    for (const key of Object.keys(this.verificationCodeForm.controls)) {
      const field = this.verificationCodeForm.controls[key];
      if (field?.invalid && (field?.dirty || field?.touched)) return true;
    }
    return false;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onDigitInput(event: any) {
    let element;
    if (event.data !== null) {
      if (parseInt(event.data)) {
        element = event.srcElement.nextElementSibling;
      }
    }
    if (event.data === null) {
      element = event.srcElement.previousElementSibling;
    }
    if (element == null) return;
    else element.focus();
  }

  onPaste(event: any) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');

    if (pastedText.length < 6) return;

    this.value1?.setValue(pastedText[0]);
    this.value2?.setValue(pastedText[1]);
    this.value3?.setValue(pastedText[2]);
    this.value4?.setValue(pastedText[3]);
    this.value5?.setValue(pastedText[4]);
    this.value6?.setValue(pastedText[5]);
  }

  private startTimer() {
    return interval(100).pipe(
      map((x: number) => {
        this.updateTimer();
        return x;
      })
    );
  }

  private updateTimer() {
    const now = new Date();
    const diff = this.finishDate.getTime() - now.getTime();
    const diffInSeconds = Math.floor(diff / 1000);
    if (diff <= 0) {
      this.timer?.unsubscribe();
      this.secondLeft = '';
      this.isResendEmailEnabled = true;
    } else {
      this.secondLeft = this.toMinutes(diffInSeconds);
    }
  }

  private toMinutes(time: number) {
    const paddLeft = (val: number) => val.toString().padStart(2, '0');
    const minutes = Math.floor(time / 60);
    const seconds = paddLeft(time % 60);
    return `${minutes}:${seconds}`;
  }

  private resetTimer() {
    this.finishDate = new Date(Date.now() + 90 * 1000);
    this.timer = this.startTimer().subscribe();
    this.isResendEmailEnabled = false;
  }
}
