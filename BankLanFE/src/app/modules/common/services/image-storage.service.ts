import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ImageStorageModel } from '../models/image-storage.model';
import Global from '../../../Global';
@Injectable()
export class ImageStorageService extends BaseService<ImageStorageModel> {
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/ImageStorage`;
  }
}
