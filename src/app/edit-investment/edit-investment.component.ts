import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Mf } from '../mf';

@Component({
  selector: 'app-edit-investment',
  templateUrl: './edit-investment.component.html',
  styleUrls: ['./edit-investment.component.css']
})
export class EditInvestmentComponent implements OnInit {


  amclistUrl = 'http://10.195.9.176:3000/getList';
  mflistUrl = 'http://10.195.9.176:3000/getMfList/';
  index: number;
  mf = new Mf();
  private sub: any;
  formatedDate: string;
  transacHisturl = 'http://10.195.9.176:3000/getInvDetails';

  constructor(private http: Http, private router: Router,
		private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.index = +params['index']; // (+) converts string 'id' to a number

   });
	console.log(this.index);
	const transacGetUrl = this.transacHisturl + '/' + this.index;
  	this.http.get(transacGetUrl).subscribe(res => {
		const body = JSON.parse(res['_body']);
                this.mf.setName(body["mfName"]);
                this.mf.setAmount(body["amount"]);
                const dateString = body["date"];
      		this.reverseFormatDate(dateString);
                this.mf.setDate(this.formatedDate);
    });
  }


    onSubmit() {
	console.log('onSubmit called');
	const transacPutUrl = this.transacHisturl + '/' + this.index;
	console.log(transacPutUrl);
	this.formatDate(this.mf.getDate());
        this.mf.setDate(this.formatedDate);
	const req = JSON.stringify(this.mf);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
	this.http.put(transacPutUrl, req, options).subscribe(res => {
		console.log('success');
		this.router.navigate(['./transactions']);
	);
    }

    reverseFormatDate(date: string) {
      const data = date.split('-');
      const day = data[0];
      const year = data[2];
      let month;
      switch (data[1]) {
        case 'Jan': {
            month = '01';
            break;
        }
        case 'Feb': {
          month = '02';
          break;
        }
        case 'Mar': {
          month = '03';
          break;
        }
        case 'Apr': {
          month = '04';
          break;
        }
        case 'May': {
          month = '05';
          break;
        }
        case 'Jun': {
          month = '06';
          break;
        }
        case 'Jul': {
          month = '07';
          break;
        }
        case 'Aug': {
          month = '08';
          break;
        }
        case 'Sep': {
          month = '09';
          break;
        }
        case 'Oct': {
          month = '10';
          break;
        }
        case 'Nov': {
          month = '11';
          break;
        }
        case 'Dec': {
          month = '12';
          break;
        }
     }
     this.formatedDate = year + '-' + month + '-' + day;
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
