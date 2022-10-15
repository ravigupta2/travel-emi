import { Injectable } from '@angular/core';
import {CommonService} from "./common";


@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(public common: CommonService) {
    }

}
