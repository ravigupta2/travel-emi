import {Component, OnDestroy, OnInit} from '@angular/core';
import {HelperService} from "../../core/services";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {
  emiForm: FormGroup;
  emiData: any = [];

  constructor(private helper:HelperService,private fb: FormBuilder) {
    this.emiForm = this.fb.group({
      bookingDate: ['', [Validators.required]],
      checkinDate: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }
  checkEmi(){
    console.log(this.emiForm.value)
    const data = {...this.emiForm.value}
    if(data.bookingDate && data.checkinDate && data.amount){
      this.emiData = this.helper.common.generateEmi(data)
    }
    console.log(this.emiData)
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
  }
}
