import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PageData<T> {
  Data: T[];
  TotalRecords: number;
}
@Injectable()
export class BaseService<T> {
  public resource: string;
  constructor(protected httpClient: HttpClient) {
  }

  Search(criteria) {
    let url = `${this.resource}/Search`;
    return this.httpClient.post(url, criteria) as Observable<PageData<T>>;
  }

  Get(id: string) {
    let url = `${this.resource}/Get/${id}`;
    return this.httpClient.get(url) as Observable<T>;
  } 

  Create(entity) {
    let url = `${this.resource}/Post`;
    return this.httpClient.post(url, entity) as Observable<T>;
  }

  Edit(entity: T) {
    let url = `${this.resource}/Put`;
    return this.httpClient.put(url, entity) as Observable<T>;
  }

  Delete(id: string) {
    let url = `${this.resource}/Delete/${id}`;
    return this.httpClient.delete(url) as Observable<boolean>;
  }
}
