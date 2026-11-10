import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LanguageService, SupportedLanguage } from './services/language.service';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);
  langService = inject(LanguageService);
  private router = inject(Router);

  isMobileMenuOpen = false;

  get currentLang(): SupportedLanguage {
    return this.langService.getCurrentLanguage();
  }

  onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select && select.value) {
      this.langService.setLanguage(select.value as SupportedLanguage);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
    this.router.navigate(['/login']);
  }
}
