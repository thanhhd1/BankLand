import {BaseCriteria} from './base.criteria'
export class HistoricalSiteCriteria extends BaseCriteria{
    Category: string;
    OrderRecognition: string;
    LicenseNumber: string;
    Profile: string;
    Address: string;
    OrderNumberRecognition: string;
    DecisionBy: string;
    DecisionDate?: Date;
    Name:string;
}