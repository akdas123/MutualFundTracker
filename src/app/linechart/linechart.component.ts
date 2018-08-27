import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ColorCodeRGB } from '../colorCodeRGB';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  chartOptions = {
    responsive: true,
    showAllTooltips: true
  };

  csvUrl: string;
  investUrl = 'assets/portfolio/investmentDetails.csv';
  lines: any[];
  transacDetails: any[];
  chartLabels: any[];
  alldates: any[];
  chartData: any[];
  dataPoints: any[];
  pointBackgroundColor: any[];
  pointRadius: any[];
  label: any[];
  id: number;
  private sub: any;
  fundName = '......';
  latestNAV = '';
  latestDate = '';
  isIncreased: boolean;

  myColors = [];
  colorCodeRGB = new ColorCodeRGB();

  onChartClick(event) {
    console.log(event);
  }


  constructor (private http: Http,
    private route: ActivatedRoute) {
      this.myColors = [
        {
          backgroundColor: this.colorCodeRGB.customGreenBackground,
          borderColor: this.colorCodeRGB.customGreen,
          pointBorderColor: this.colorCodeRGB.customGreen,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: this.colorCodeRGB.customGreenPointHover,
          pointSize: 20
        }
      ];
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    this.csvUrl = 'assets/navData/' + this.id + '.csv';
    this.chartLabels = [];
    this.alldates = [];
    this.dataPoints = [];
    this.pointBackgroundColor = [];
    this.pointRadius = [];
    this.label = [];
    this.chartData = [
        { data: this.dataPoints, pointBackgroundColor: this.pointBackgroundColor,
           pointRadius: this.pointRadius, pointHoverRadius: 3 }
      ];
    this.readCsvData();
  }
  private readCsvData () {
    this.http.get(this.csvUrl).subscribe(csvdata => {
      this.lines = [];
      this.extractCsvData(csvdata.text());
      this.http.get(this.investUrl).subscribe(invdata => {
        this.transacDetails = [];
        this.extractInvData(invdata.text(), this.id);
        this.populateChartData();
        this.chartData = [
          { data: this.dataPoints, label: this.fundName, pointBackgroundColor: this.pointBackgroundColor,
             pointRadius: this.pointRadius, pointHoverRadius: 3 }
        ];
      }, err => this.handleError(err));
    }, err => this.handleError(err));
  }


  private populateChartData() {
    this.fundName = this.transacDetails[0][1];
    this.latestNAV = this.lines[this.lines.length - 1][2];
    this.latestDate = this.lines[this.lines.length - 1][5];
    if (this.latestNAV > this.lines[this.lines.length - 2][2]) {
      this.isIncreased = true;
    } else {
      this.isIncreased = false;
    }
    const invDates = [];
    const invAmount = [];
    let index = 0;
    for (let i = 0; i < this.transacDetails.length; i++) {
      invDates.push(this.transacDetails[i][3]);
      invAmount.push(this.transacDetails[i][2]);
    }
    for ( let i = 1; i < this.lines.length; i++) {
      this.chartLabels.push(this.lines[i][5]);
      this.alldates.push(this.lines[i][5]);
      this.dataPoints.push(this.lines[i][2]);
      if (invDates.includes(this.lines[i][5])) {
        this.pointBackgroundColor.push(this.colorCodeRGB.black);
        this.pointRadius.push(5);
        this.label.push('Investment Amount : ' + invAmount[index]);
        index++;
      } else {
        this.pointBackgroundColor.push(this.colorCodeRGB.customGreen);
        this.pointRadius.push(1);
      }
    }
  }
  private extractInvData(res: string, id: number) {
    const allTextLines = res.split(/\r\n|\n/);
    const headers = allTextLines[0].split(';');

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        const data = allTextLines[i].split(';');
        if (data.length === headers.length && data[0] === id.toString()) {
            const tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            this.transacDetails.push(tarr);
        }
    }
  }
  private extractCsvData(res: string) {
    const allTextLines = res.split(/\r\n|\n/);
    const headers = allTextLines[0].split(';');

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        const data = allTextLines[i].split(';');
        if (data.length === headers.length) {
            const tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            this.lines.push(tarr);
        }
    }
   // console.log(this.chartLabels);
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

  showChart(duration: number) {
    // const noOfdays = (duration - (2 * ~~(duration / 7)));
    // console.log('showChart called with days:' + noOfdays);
    let modifiedDataPoints = [];
    this.chartLabels = [];
    this.pointBackgroundColor = [];
    this.pointRadius = [];
    const invDates = [];
    const invAmount = [];
    let index = 0;
    for (let i = 0; i < this.transacDetails.length; i++) {
      invDates.push(this.transacDetails[i][3]);
      invAmount.push(this.transacDetails[i][2]);
    }
    const lastNav = Number(this.dataPoints[this.dataPoints.length - 1]);
    let firstNav;
    if ((this.dataPoints.length - duration) < 0) {
      firstNav = Number(this.dataPoints[0]);
    } else {
      firstNav = Number(this.dataPoints[this.dataPoints.length - duration]);
    }
    if (lastNav > firstNav) {
      for (let i = (this.dataPoints.length - 1); i >= (this.dataPoints.length - duration) && i > 0; i--) {
        modifiedDataPoints.push(this.dataPoints[i]);
        this.chartLabels.push(this.alldates[i]);
        if (invDates.includes(this.alldates[i])) {
          this.pointBackgroundColor.push(this.colorCodeRGB.black);
          this.pointRadius.push(5);
          this.label.push('Investment Amount : ' + invAmount[index]);
          index++;
        } else {
          this.pointBackgroundColor.push(this.colorCodeRGB.customGreen);
          this.pointRadius.push(1);
        }
      }
      this.myColors = [
        {
          backgroundColor: this.colorCodeRGB.customGreenBackground,
          borderColor: this.colorCodeRGB.customGreen,
          pointBorderColor: this.colorCodeRGB.customGreen,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: this.colorCodeRGB.customGreenPointHover,
          pointSize: 20
        }
      ];
    } else {
      for (let i = (this.dataPoints.length - 1); i >= (this.dataPoints.length - duration) && i > 0; i--) {
        modifiedDataPoints.push(this.dataPoints[i]);
        this.chartLabels.push(this.alldates[i]);
        if (invDates.includes(this.alldates[i])) {
          this.pointBackgroundColor.push(this.colorCodeRGB.black);
          this.pointRadius.push(5);
          this.label.push('Investment Amount : ' + invAmount[index]);
          index++;
        } else {
          this.pointBackgroundColor.push(this.colorCodeRGB.customRed);
          this.pointRadius.push(1);
        }
      }
      this.myColors = [
        {
          backgroundColor: this.colorCodeRGB.customRedBackground,
          borderColor: this.colorCodeRGB.customRed,
          pointBorderColor: this.colorCodeRGB.customRed,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: this.colorCodeRGB.customRedPointhover,
          pointSize: 20
        }
      ];
    }
    this.chartLabels = this.chartLabels.reverse();
    modifiedDataPoints = modifiedDataPoints.reverse();
    this.pointBackgroundColor = this.pointBackgroundColor.reverse();
    this.pointRadius = this.pointRadius.reverse();
    this.chartData = [
      { data: modifiedDataPoints, label: this.fundName, pointBackgroundColor: this.pointBackgroundColor,
         pointRadius: this.pointRadius, pointHoverRadius: 3 }
    ];
  }

}
