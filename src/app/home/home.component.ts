import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { RouteGraph } from './model/routegraph';
import { NgForm } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
    this.routeGraphTravelTime = new RouteGraph("", "");
    this.routeGraphCongestionRate = new RouteGraph("", "");
    //1st graph
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
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    }
    this.data = [
      {
        values: [
          {
            "label": "A",
            "value": 29.765957771107
          },
          {
            "label": "B",
            "value": 0
          },
          {
            "label": "C",
            "value": 32.807804682612
          },
          {
            "label": "D",
            "value": 196.45946739256
          },
          {
            "label": "E",
            "value": 0.19434030906893
          },
          {
            "label": "F",
            "value": 98.079782601442
          },
          {
            "label": "G",
            "value": 13.925743130903
          },
          {
            "label": "H",
            "value": 5.1387322875705
          }
        ]
      }
    ];


    //second graph
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
        x: function(d) { return d.x; },
        y: function(d) { return d.y; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Time (ms)'
        },
        yAxis: {
          axisLabel: 'Voltage (v)',
          tickFormat: function(d) {
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        }
      }
    };
    this.data2 = this.sinAndCos();
  }

  sinAndCos() {
    var sin2 = [];

    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < 100; i++) {
      sin2.push({ x: i, y: i % 10 == 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });
    }

    return [
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#7777ff',
        area: true
      }
    ];
  }

  getRouteTavelTime(routeTavelTimeForm: NgForm) {
    console.log("in route travel time form");
  }
  getRouteCongestionRate(routeCongestionTimeForm: NgForm) {
    console.log("in route congestion rate form");
  }
}
