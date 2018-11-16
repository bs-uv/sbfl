import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  getFitbitUserId(userId: string) {
    return userId.split("|")[1];
  }

  public getGroupString(str: string) {
    return str.toLocaleLowerCase();
  }

  public sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
    return str.trim();
  }
}
