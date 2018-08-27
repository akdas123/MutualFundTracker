import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MarketValueComputeService {

  investUrl = 'assets/portfolio/totalInvestment.csv';
  constructor(private http: Http) {
   }

   compute(id: number) {
     console.log(id);
    //  this.http.get(this.investUrl).subscribe(invdata => {
    //   const allTextLines = invdata.text().split(/\r\n|\n/);
    //   const headers = allTextLines[0].split(';');
    //   for ( let i = 0; i < allTextLines.length; i++) {
    //       // split content based on semicolon
    //       const data = allTextLines[i].split(';');
    //       if (data.length === headers.length && data[0] === id.toString()) {
    //           const tarr = [];
    //           for ( let j = 0; j < headers.length; j++) {
    //               tarr.push(data[j]);
    //           }
    //           this.transacDetails.push(tarr);
    //       }
    //   }
    //  });

   }
}
