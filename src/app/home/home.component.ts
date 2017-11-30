import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouteGraph } from './model/routegraph';
import { NgForm } from '@angular/forms';
import { HomeGraphService } from "./home-graph.service";
import {GraphData} from "./model/graphdata";
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare let d3: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    '../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  options;
  data;
  options2;
  data2;
  routeGraphTravelTime: RouteGraph;
  routeGraphCongestionRate: RouteGraph;
  graphDataTravelTime: GraphData;
  graphDataCongestionRate: GraphData;
  statusCode: number;

  constructor(private homeGraphService: HomeGraphService) { }

  ngOnInit() {
    this.routeGraphTravelTime = new RouteGraph("", "", "", "");
    this.routeGraphCongestionRate = new RouteGraph("", "", "", "");

    //second graph
    // this.options2 = {
    //   chart: {
    //     type: 'lineChart',
    //     height: 450,
    //     margin: {
    //       top: 20,
    //       right: 20,
    //       bottom: 40,
    //       left: 55
    //     },
    //     x: function(d) { return d.label; },
    //     y: function(d) { return d.value; },
    //     useInteractiveGuideline: true,
    //     xAxis: {
    //       axisLabel: 'Time (hours)'
    //     },
    //     yAxis: {
    //       axisLabel: 'Congestion Rate (%)',
    //       tickFormat: function(d) {
    //         return d3.format('.0f')(d);
    //       },
    //       axisLabelDistance: -10
    //     }
    //   }
    // };
    // this.data2 = this.congestionRate();
  }

  // congestionRate() {
  //
  //   var congestionRateValue = [{
  //     "label": 0,
  //     "value": 10
  //   },
  //     {
  //       "label": 1,
  //       "value": 11
  //     },
  //     ];
  //
  //   return [
  //     {
  //       values: congestionRateValue,
  //       key: 'Congestion Rate',
  //       color: '#7777ff',
  //       area: true
  //     }
  //   ];
  // }

  getRouteTavelTime(routeTavelTimeForm: NgForm) {
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d) { return d.label; },
        y: function(d) { return d.value; },
        showValues: true,
        valueFormat: function(d) {
          return d3.format(',.0f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'Time (hours)'
        },
        yAxis: {
          axisLabel: 'Travel time (min)',
          axisLabelDistance: -10
        }
      }
    }
    this.statusCode = null;
    this.homeGraphService.routeTravelTimeMethod(this.routeGraphTravelTime)
      .subscribe(successCode => {
      this.graphDataTravelTime = successCode;
        this.data = [
          {
            values: this.graphDataTravelTime
          }
        ];
      console.log(this.graphDataTravelTime);
    }, errorCode => this.statusCode = errorCode)

  }

  getRouteCongestionRate(routeCongestionTimeForm: NgForm) {
    this.options2 = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d) { return d.label; },
        y: function(d) { return d.value; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Time (hours)'
        },
        yAxis: {
          axisLabel: 'Congestion Rate (%)',
          tickFormat: function(d) {
            return d3.format('.2f')(d);
          },
          axisLabelDistance: -10
        }
      }
    };

    this.statusCode = null;
    this.homeGraphService.routeCongestionTimeMethod(this.routeGraphCongestionRate)
      .subscribe(successCode => {
        this.graphDataCongestionRate = successCode;
        this.data2 = [
          {
            values: this.graphDataCongestionRate,
            key: 'Congestion Rate',
            color: '#7777ff',
            area: true
          }
        ];
        console.log(this.graphDataCongestionRate);
      }, errorCode => this.statusCode = errorCode)
  }
}
