import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private langService = inject(LanguageService);

  transform(key: string | null | undefined): string {
    if (!key) return '';
    return this.langService.t(key);
  }
}

@Pipe({
  name: 'localizedCurrency',
  standalone: true,
  pure: false
})
export class LocalizedCurrencyPipe implements PipeTransform {
  private langService = inject(LanguageService);

  transform(amount: number | null | undefined): string {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return this.langService.formatCurrency(0);
    }
    return this.langService.formatCurrency(amount);
  }
}

@Pipe({
  name: 'localizedDate',
  standalone: true,
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  private langService = inject(LanguageService);

  transform(dateStr: string | null | undefined): string {
    if (!dateStr) return '';
    return this.langService.formatDate(dateStr);
  }
}
