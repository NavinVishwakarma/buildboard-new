import { Injectable } from '@angular/core';
import * as CryptoTS from 'crypto-ts';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  TEMP = {
    KEY: '_buildboardk',
    PASSWORD: '90590348534YYIU!@00'
  };
  USER = {
    KEY: '__buildboardu',
    PASSWORD: '!##0895*()?:}95047834&&tes'
  };

  constructor(
    private cookie: CookieService
  ) { }
  private encription(data: any, secret: string): any {
    return CryptoTS.AES.encrypt(JSON.stringify(data), secret);
  }
  private decription(data: any, secret: string): any {
    const bytes = CryptoTS.AES.decrypt(data.toString(), secret);
    return JSON.parse(bytes.toString(CryptoTS.enc.Utf8));
  }
  setUser(data: any): any {
    return this.cookie.set(this.USER.KEY, this.encription(data, this.USER.PASSWORD).toString());
  }
  getUser(): any {
    const DATA = this.cookie.get(this.USER.KEY) !== null ? this.cookie.get(this.USER.KEY) : undefined;
    if (DATA && DATA !== undefined) {
      return this.decription(DATA, this.USER.PASSWORD);
    } else {
      return undefined;
    }
  }

  clearUser(): any {
    return this.cookie.delete(this.USER.KEY);
  }
  getDataField(type: string): any {
    if (this.getUser() !== undefined && this.getUser()[type] !== undefined) {
      return this.getUser()[type];
    } else {
      return undefined;
    }
  }

  isAuthenticate(): any {
    if (this.getDataField('token') !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}
