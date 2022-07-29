import { environment } from '../environments/environment';
import { CurrencyPipe } from '@angular/common';

export default class Global {
	public static apiUrl = environment.apiUrl;
	public static currentUser: string = '___csm_client_admin__current_user___';
	public static defaultDateKey: string = '____defaultDate___';
	public static getToken() {
		let currentUser = JSON.parse(localStorage.getItem(Global.currentUser));
		if (currentUser && currentUser.access_token) {
			return 'Bearer ' + currentUser.access_token;
		}
		return '';
	}


	public static FormatCurrency(value) {
		return new CurrencyPipe('vi').transform(value, 'đ','code','1.0-0');
	}
}

export class RoleConstants {
	public static Administrator = "Administrator";
	public static CompanyAdmin = "CompanyAdmin";
	public static User = "User";

	public static Employee_Historical = "Employee_Historical";
	public static  Employee_Cultural_Services = "Employee_Cultural_Services";
	public static  Employee_Travel_Services = "Employee_Travel_Services";
}
