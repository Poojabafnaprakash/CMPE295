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
    this.data = [
      {
        values: [
          {
            "label": "0",
            "value": 15
          },
          {
            "label": "1",
            "value": 14
          },
          {
            "label": "2",
            "value": 13
          },
          {
            "label": "3",
            "value": 14
          },
          {
            "label": "4",
            "value": 13
          },
          {
            "label": "5",
            "value": 14
          },
          {
            "label": "6",
            "value": 14
          },
          {
            "label": "7",
            "value": 18
          },
          {
            "label": "8",
            "value": 21
          },
          {
            "label": "9",
            "value": 22
          },
          {
            "label": "10",
            "value": 18
          },
          {
            "label": "11",
            "value": 17
          },
          {
            "label": "12",
            "value": 17
          },
          {
            "label": "13",
            "value": 16
          },
          {
            "label": "14",
            "value": 16
          },
          {
            "label": "15",
            "value": 15
          },
          {
            "label": "16",
            "value": 17
          },
          {
            "label": "17",
            "value": 18
          },
          {
            "label": "18",
            "value": 23
          },
          {
            "label": "19",
            "value": 22
          },
          {
            "label": "20",
            "value": 18
          },
          {
            "label": "21",
            "value": 16
          },
          {
            "label": "22",
            "value": 16
          },
          {
            "label": "23",
            "value": 15
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
        x: function(d) { return d.label; },
        y: function(d) { return d.value; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Time (hours)'
        },
        yAxis: {
          axisLabel: 'Congestion Rate (%)',
          tickFormat: function(d) {
            return d3.format('.0f')(d);
          },
          axisLabelDistance: -10
        }
      }
    };
    this.data2 = this.congestionRate();
  }

  congestionRate() {
    var congestionRateValue = [{
      "label": 0,
      "value": 10
    },
    {
      "label": 1,
      "value": 11
    },
    {
      "label": 2,
      "value": 11
    },
    {
      "label": 3,
      "value": 9
    },
    {
      "label": 4,
      "value": 10
    },
    {
      "label": 5,
      "value": 30
    },
    {
      "label": 6,
      "value": 35
    },
    {
      "label": 7,
      "value": 38
    },
    {
      "label": 8,
      "value": 75
    },
    {
      "label": 9,
      "value": 90
    },
    {
      "label": 10,
      "value": 85
    },
    {
      "label": 11,
      "value": 50
    },
    {
      "label": 12,
      "value": 23
    },
    {
      "label": 13,
      "value": 24
    },
    {
      "label": 14,
      "value": 15
    },
    {
      "label": 15,
      "value": 14
    },
    {
      "label": 16,
      "value": 13
    },
    {
      "label": 17,
      "value": 90
    },
    {
      "label": 18,
      "value": 93
    },
    {
      "label": 19,
      "value": 96
    },
    {
      "label": 20,
      "value": 94
    },
    {
      "label": 21,
      "value": 85
    },
    {
      "label": 22,
      "value": 70
    },
    {
      "label": 23,
      "value": 50
    }];

    return [
      {
        values: congestionRateValue,
        key: 'Congestion Rate',
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
