import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Mf } from '../mf';

@Component({
  selector: 'app-cumulativechart',
  templateUrl: './cumulativechart.component.html',
  styleUrls: ['./cumulativechart.component.css']
})
export class CumulativechartComponent implements OnInit {

  chartOptions = {
    responsive: true,
    showAllTooltips: true
  };

  mflist: Mf[] = [];
  // invFundurl = '/assets/portfolio/totalInvestment.csv';
  invFundurl = 'http://10.195.9.176:3000/getAllInvestments';
  totalInv: number;
  currentVal: number;
  totalGain: number;
  isGain: boolean;

  chartData: any[];
  chartLabels: any[];
  dataPoints: any[];

  onChartClick(event) {
    console.log(event);
  }
  constructor(private http: Http) {
    this.chartLabels = [];
    this.dataPoints = [];
    this.chartData = [
      {data: this.dataPoints}
    ];
  }

  ngOnInit() {
    this.http.get(this.invFundurl).subscribe(res => {
      const allTextLines = res.text().split(/\r\n|\n/);
      const headers = allTextLines[0].split(';');
      this.totalInv = 0;
      this.currentVal = 0;
      for ( let i = 1; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(';');
        if (data.length === headers.length) {
                this.chartLabels.push(data[1]);
                this.dataPoints.push(+data[4]);
        	this.totalInv += +data[2];
		this.currentVal += +data[4];
	}
    }
    this.chartData = [
      {data: this.dataPoints}
    ];
    this.totalGain = this.currentVal - this.totalInv; 
    if ( this.totalGain < 0 ) {
	this.isGain = false;
    } else {
	this.isGain = true;	
    }
    });

  }

}
