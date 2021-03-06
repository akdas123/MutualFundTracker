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
  dayGain: number;
  isTotalGain: boolean;
  isDayGain: boolean;

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
      this.dayGain = 0;
      this.totalGain = 0;
      for ( let i = 1; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(';');
        if (data.length === headers.length) {
                this.chartLabels.push(data[1]);
                this.dataPoints.push(+data[4]);
        	this.totalInv += +data[2];
		this.currentVal += +data[4];
		this.dayGain += +data[5];
		this.totalGain += +data[6];
	}
    }
    this.chartData = [
      {data: this.dataPoints}
    ];
    if ( this.totalGain < 0 ) {
	this.isTotalGain = false;
    } else {
	this.isTotalGain = true;	
    }
    if ( this.dayGain < 0 ) {
	this.isDayGain = false;
    } else {
	this.isDayGain = true;	
    }
    });

  }

}
