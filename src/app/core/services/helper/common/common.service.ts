import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CommonService {
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  MIN_DIFF = 14
  constructor() {
  }
  formatDate(date: string | number | Date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }
  daysBetween(startDate: any, endDate: any) {
    const one_day = 1000 * 60 * 60 * 24;

    const x = startDate.split("-");
    const y = endDate.split("-");

    const date1 = new Date(x[0], (x[1] - 1), x[2]);
    const date2 = new Date(y[0], (y[1] - 1), y[2]);

    const month1 = x[1] - 1;
    const month2 = y[1] - 1;
    return Math.ceil((date2.getTime()-date1.getTime())/(one_day));
  }
  dateFirstDate(startDate: any, endDate: any) {
    const start = startDate.split('-');
    const end = endDate.split('-');
    const startYear = parseInt(start[0]);
    const endYear = parseInt(end[0]);
    const dates = [];
    for(let i = startYear; i <= endYear; i++) {
      const endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
      const startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
      for(let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
        const month = j + 1;
        const displayMonth = month < 10 ? '0' + month : month;
        if(i == startYear && displayMonth == start[1]){
          dates.push([i, displayMonth, start[2]].join('-'));
        } else {
          dates.push([i, displayMonth, '01'].join('-'));
        }
      }
    }
    const last = dates[dates.length - 1]
    const diff = this.daysBetween(last , endDate)
    if(diff < this.MIN_DIFF){
      const myPastDate=new Date(last);
      myPastDate.setDate(myPastDate.getDate() - (this.MIN_DIFF - diff));
      dates[dates.length - 1] = this.formatDate(myPastDate)
    }
    return dates;
  }
  generateEmi(data: any){
    let emi: any = [];
    let emiData = data
    emiData.difference = this.daysBetween(emiData.bookingDate , emiData.checkinDate)

    console.log(emiData)
    if(data.difference > 30){
      emiData.dates = this.dateFirstDate(emiData.bookingDate , emiData.checkinDate)
      if(emiData.dates?.length){
        emi = this.generateEmiAmount(emiData)
      }
    }
    return emi
  }
  generateEmiAmount(data: { dates: string | any[]; amount: any; }){
    const amountData = [];
    if(data.dates.length == 1){
      amountData.push(this.generateObject(data.dates[0], data.amount))
    } else {
      let amount = data.amount;
      const part = data.dates.length - 1;
      if (typeof data.dates !== "string") {
        data.dates.map((date , index) => {
          if(index == 0){
            amountData.push(this.generateObject(date, amount*0.25))
            amount = amount * 0.75;
          } else {
            amountData.push(this.generateObject(date, amount / part))
          }
        })
      }
    }
    return amountData;
  }
  generateObject(date: any, amount: any){
    return {
      date: date,
      amount: amount
    }
  }
}
