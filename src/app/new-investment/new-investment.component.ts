import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-investment',
  templateUrl: './new-investment.component.html',
  styleUrls: ['./new-investment.component.css']
})
export class NewInvestmentComponent implements OnInit {


  amcNameList: string[] = [];
  mfNameList: string[] = [];
  mfIdList: number[] = [];
  amcIdList: number[] = [];
  amclistUrl = 'http://10.195.9.176:3000/getList';
  mflistUrl = 'http://10.195.9.176:3000/getMfList/';
  amcIdSelected: number;
  mfIdSelected: number;
  amount: number;
  date: string;
  formatedDate: string;
  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.http.get(this.amclistUrl).subscribe(res => {
      const allTextLines = res.text().split(/\r\n|\n/);
      const headers = allTextLines[0].split(';');

      for ( let i = 1; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(';');
        if (data.length === headers.length) {
            this.amcNameList.push(data[0]);
            this.amcIdList.push(+data[1]);
        }
    }
    });
  }

  onChange(event) {
    const newVal = event.target.value;
    const index = this.amcNameList.indexOf(newVal);
    this.amcIdSelected = this.amcIdList[index];
    console.log(this.amcIdSelected);
    const fullMflistUrl = this.mflistUrl + this.amcIdSelected;
    this.http.get(fullMflistUrl).subscribe(res => {
      const allTextLines = res.text().split(/\r\n|\n/);
      const headers = allTextLines[0].split(';');
      this.mfIdList = [];
      this.mfNameList = [];

      for ( let i = 1; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(';');
        if (data.length === headers.length) {
            this.mfIdList.push(+data[0]);
            this.mfNameList.push(data[1]);
        }
    }
    });
  }

  onChangeMf(event) {
    const newVal = event.target.value;
    const index = this.mfNameList.indexOf(newVal);
    this.mfIdSelected = this.mfIdList[index];
    console.log(this.mfIdSelected);
    }

    onSubmit() {
      const index = this.mfIdList.indexOf(this.mfIdSelected);
      const schemeName = this.mfNameList[index];
      this.formatDate(this.date);
      const reqJson = JSON.stringify({
        schemeCode: this.mfIdSelected,
        schemeName: schemeName,
        amount: this.amount,
        date: this.formatedDate
      });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
      console.log(reqJson);
      this.http.post('http://10.195.9.176:3000/addInvestment', reqJson, options).subscribe(
      data => {
       console.log('success'); 
       alert('Success');
       this.router.navigate(['./dashboard']);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
      );
    }

    formatDate(date: string) {
      const data = date.split('-');
      const day = data[2];
      const year = data[0];
      let month;
      switch (data[1]) {
        case '01': {
            month = 'Jan';
            break;
        }
        case '02': {
          month = 'Feb';
          break;
        }
        case '03': {
          month = 'Mar';
          break;
        }
        case '04': {
          month = 'Apr';
          break;
        }
        case '05': {
          month = 'May';
          break;
        }
        case '06': {
          month = 'Jun';
          break;
        }
        case '07': {
          month = 'Jul';
          break;
        }
        case '08': {
          month = 'Aug';
          break;
        }
        case '09': {
          month = 'Sep';
          break;
        }
        case '10': {
          month = 'Oct';
          break;
        }
        case '11': {
          month = 'Nov';
          break;
        }
        case '12': {
          month = 'Dec';
          break;
        }
     }
     this.formatedDate = day + '-' + month + '-' + year;
    }

}
