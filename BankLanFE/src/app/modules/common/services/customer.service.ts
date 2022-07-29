import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service'; 
import CustomerModel from '../models/customer.model';
import Global from '../../../Global';
@Injectable()
export class CustomerService extends BaseService<CustomerModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/Customer`;
  } 
}