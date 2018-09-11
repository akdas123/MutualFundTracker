import { Component, OnInit } from '@angular/core';
import { Mf } from '../mf';
import { Http } from '@angular/http';
import { MarketValueComputeService } from '../market-value-compute.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mflist: Mf[] = [];
//  invFundurl = '/assets/portfolio/totalInvestment.csv';
  invFundurl = 'http://10.195.9.176:3000/getAllInvestments';

  constructor(private http: Http,
              private mVal: MarketValueComputeService) { }

  ngOnInit() {
    this.http.get(this.invFundurl).subscribe(res => {
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
                mf.setMarketVal(+data[4]);
                mf.setDayGain(+data[5]);
                mf.setTotalGain(+data[6]);
                if (mf.getMarketVal() < mf.getAmount()) {
                  mf.setTotalProfit(false);
                } else {
                  mf.setTotalProfit(true);
                }
                if (mf.getDayGain() < 0 ) {
                  mf.setProfit(false);
                } else {
                  mf.setProfit(true);
                }
            this.mflist.push(mf);
        }
      }
      // for ( let i = 0; i < this.mflist.length; i++) {
      //   this.mVal.compute(this.mflist[i].getId());
      // }
    });

  }

}
