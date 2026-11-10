import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '../services/language.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  langService = inject(LanguageService);

  loginForm!: FormGroup;
  errorMessage = '';
  infoMessage = '';
  returnUrl = '/home';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
        this.infoMessage = this.langService.t('LOGIN_REQUIRED_MSG');
      }
      if (params['registered']) {
        this.infoMessage = 'Account created successfully! Please login with your credentials.';
      }
    });

    // If already logged in, redirect
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  fillDemoUser(): void {
    this.loginForm.patchValue({
      email: 'user@railconnect.com',
      password: 'user123'
    });
    this.errorMessage = '';
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    const res = this.authService.login(email, password);

    if (res.success) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.errorMessage = this.langService.t(res.messageKey);
    }
  }
}
