import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../../services/summary.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent  {

  chart = [] ;
  
  constructor(private _weather: SummaryService) {}

  /*ngOnInit() {
    this._weather.dailyForecast()
      .subscribe(res => {
        
        let temp_max = res['list'].map(res => res.main.temp_max)
        let temp_min = res['list'].map(res => res.main.temp_min)
        let alldates = res['list'].map(res => res.dt)

        let weatherDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
        })

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        })

      })
  }*/
}
