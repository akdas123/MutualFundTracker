import { Component, OnInit } from '@angular/core';
import { Mf } from '../mf';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  mflist: Mf[] = [];
  transacHisturl = 'http://10.195.9.176:3000/getInvDetails';
  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.http.get(this.transacHisturl).subscribe(res => {
      const allTextLines = res.text().split(/\r\n|\n/);
      const headers = allTextLines[0].split(';');

      for ( let i = 1; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(';');
        if (data.length === headers.length) {
            const mf = new Mf();
                mf.setIndex(i);
                mf.setId(+data[0]);
                mf.setName(data[1]);
                mf.setAmount(+data[2]);
                mf.setDate(data[3]);
            this.mflist.push(mf);
        }
      }
    });
  }

  onDelete(index: number) {

	console.log(index);
	const transacDelUrl = this.transacHisturl + '/' + index;
  	this.http.delete(transacDelUrl).subscribe(res => {
		console.log('success');
		window.location.reload();
    });
		
  }

  onEdit(index: number) {

	console.log(index);
	this.router.navigate(['./edit investment/' + index]);
		
  }

}
