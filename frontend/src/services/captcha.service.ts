import { Injectable } from '@angular/core';
import { environment } from '../../../backend/src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {

  isCaptchaEnabled(): boolean {
    return environment.captchaEnabled;
  }

  verifyCaptcha(token: string | null): boolean {
    // captcha OFF → allow
    if (!this.isCaptchaEnabled()) {
      return true;
    }

    // captcha ON but no token → block
    if (!token) {
      return false;
    }

    return true;
  }
}

