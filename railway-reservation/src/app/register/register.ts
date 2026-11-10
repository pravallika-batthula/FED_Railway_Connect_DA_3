import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '../services/language.service';
import { TranslatePipe } from '../pipes/translate.pipe';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (!password || !confirmPassword) return null;
  return password === confirmPassword ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  langService = inject(LanguageService);

  registerForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: passwordMatchValidator }
    );
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      if (this.registerForm.hasError('mismatch')) {
        this.errorMessage = this.langService.t('ERR_PASSWORDS_MISMATCH');
      } else {
        this.errorMessage = 'Please fix all highlighted errors above.';
      }
      return;
    }

    const { name, email, mobile, password } = this.registerForm.value;
    const result = this.authService.register({ name, email, mobile, password });

    if (result.success) {
      this.successMessage = this.langService.t('SUCCESS_REGISTER');
      setTimeout(() => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      }, 1500);
    } else {
      this.errorMessage = this.langService.t(result.messageKey);
    }
  }
}
