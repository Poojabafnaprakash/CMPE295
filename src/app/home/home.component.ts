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
    '../../../node_modules/nvd3/build/nv.d3.css',
    './home.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  options;
  data;
  options2;
  options3
  data2;
  data3;
  routeGraphTravelTime: RouteGraph;
  routeGraphCongestionRate: RouteGraph;
  routeGraphStreetCongestionRate: RouteGraph;
  graphDataTravelTime: GraphData;
  graphDataCongestionRate: GraphData;
  graphDataStreetCongestionRate: GraphData;
  statusCode: number;
  sourcesRouteTravelTime:any;
  destinationsRouteTravelTime:any;
  sourcesRouteCongestionRate:any;
  destinationsRouteCongestionRate:any;
  streetsCongestionRate: any;
  directionsCongestionRate: any;
  showProgress1:boolean = false;
  showProgress2:boolean = false;
  showProgress3:boolean = false;

  constructor(private homeGraphService: HomeGraphService) { }

  ngOnInit() {
    this.routeGraphTravelTime = new RouteGraph("", "", "", "", "", "");
    this.routeGraphCongestionRate = new RouteGraph("", "", "", "", "", "");
    this.routeGraphStreetCongestionRate = new RouteGraph("", "", "", "", "", "");

    this.sourcesRouteTravelTime = ["Casa Verde Street ", "Alum Rock Park", "San Jose State University", "Avaya Stadium", "DMV San Jose", "MapR Technologies, 350 Holger Way", "Winchester Mystery House", "N 1st Street ", "Santana Row", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131", "Downtown San Jose", "1302,The Alameda", "Mineta San Jose International Airport"];
    this.destinationsRouteTravelTime = [""];
    this.sourcesRouteCongestionRate = ["Casa Verde Street ", "Alum Rock Park", "San Jose State University", "Avaya Stadium", "DMV San Jose", "MapR Technologies, 350 Holger Way", "Winchester Mystery House", "N 1st Street ", "Santana Row", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131", "Downtown San Jose", "1302,The Alameda", "Mineta San Jose International Airport"];
    this.destinationsRouteCongestionRate = [""];
    this.streetsCongestionRate = ["Capitol Av N" , "Capitol Av S", "N 1st St", "S 1st Street", "E Santa Clara St", "W Santa Clara St", "E San Fernando St", "W San Fernando St", "E Trimble Rd", "W Trimble Rd", "E Tasman Dr",
      "W Tasman Dr", "Zanker Rd", "Stevens Creek Blvd", "Berryessa Rd", "E Brokaw Rd", "E San Salvador St", "McCarthy Blvd", "Coleman Av",
      "N 2nd St", "S 2nd St" ,"N 3rd St", "S 3rd St", "N 7th St", "S 7th St", "Charcot Av", "Airport Blvd", "Penitencia Creek Rd",
      "Alum Rock Falls Rd", "Baypointe Pkwy", "Automation Pkwy", "N Autumn St", "S Autumn St", "Stockton Av", "White Rd N", "White Rd S", "N 4th St",
      "S 4th St", "N 10th St", "S 10th St", "N 11th St", "S 11th St", "E St James St", "W St James St", "E Julian St", "W Julian St", "Zanker Rd",
      "S Baywood Av", "Trade Zone Blvd", "Lundy Ave", "Almaden Blvd", "Notre Dame Av", "Calaveras Blvd", "S Winchester Blvd", "W San Carlos St",
      "N 5th Street", "S 5th Street", "N 6th Street", "S 6th Street", "N 8th Street", "S 8th Street", "N 9th Street", "S 9th Street", "Orchard Pkwy",
      "Skyport Dr", "Santana Row", "Olsen Dr", "Hatton St", "Casa Verde St", "McKay Dr", "River Oaks Pkwy", "Toyon Av", "McKee Rd", "Virginia St",
      "Keyes St", "Parrott St", "Holger Way", "Tisch Way", "I-280 S", "I-680 N", "I-280 N", "I-680 S", "I-880 N",
      "I-880 S", "US-101 N", "US-101 S", "CA-87 N", "CA-87 S", "CA-237 E", "CA-237 W", "Montague Expressway",
      "San Tomas Expressway", "N Market St", "Senter Rd", "E San Antonio St"];
    this.directionsCongestionRate = [""];
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

  modelChangedRouteTravelTime(newObj: any) {
    if(newObj == "Casa Verde Street") {
      this.destinationsRouteTravelTime = ["Mineta San Jose International Airport", "San Jose State University", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131"];
    } else if(newObj == "Alum Rock Park") {
      this.destinationsRouteTravelTime = ["San Jose State University"];
    } else if(newObj == "San Jose State University") {
      this.destinationsRouteTravelTime = ["1302,The Alameda", "Alum Rock Park", "Casa Verde Street ", "Mineta San Jose International Airport", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131", "Avaya Stadium", "DMV San Jose", "MapR Technologies, 350 Holger Way", "Winchester Mystery House", "Santana Row"];
    } else if(newObj == "Mineta San Jose International Airport") {
      this.destinationsRouteTravelTime = ["1302,The Alameda", "Casa Verde Street ", "San Jose State University"];
    } else if(newObj == "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131") {
      this.destinationsRouteTravelTime = ["San Jose State University"];
    } else if(newObj == "Avaya Stadium") {
      this.destinationsRouteTravelTime = ["San Jose State University"];
    } else if(newObj == "DMV San Jose") {
      this.destinationsRouteTravelTime = ["San Jose State University"];
    } else if(newObj == "MapR Technologies, 350 Holger Way") {
      this.destinationsRouteTravelTime = ["San Jose State University"];
    } else if(newObj == "Winchester Mystery House") {
      this.destinationsRouteTravelTime = ["San Jose State University"];
    } else if(newObj == "N 1st Street") {
      this.destinationsRouteTravelTime = ["Santana Row", "Downtown San Jose"];
    } else if(newObj == "Santana Row") {
      this.destinationsRouteTravelTime = ["N 1st Street ", "San Jose State University"];
    } else if(newObj == "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131") {
      this.destinationsRouteTravelTime = ["Casa Verde Street "];
    } else if(newObj == "Downtown San Jose") {
      this.destinationsRouteTravelTime = ["N 1st Street "];
    } else if(newObj == "1302,The Alameda") {
      this.destinationsRouteTravelTime = ["Mineta San Jose International Airport", "San Jose State University"];
    } else {
      this.destinationsRouteTravelTime = ["Choose a proper source"];
    }
  }

  modelChangedRouteCongestionRate(newObj: any) {
    if(newObj == "Casa Verde Street") {
      this.destinationsRouteCongestionRate = ["Mineta San Jose International Airport", "San Jose State University", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131"];
    } else if(newObj == "Alum Rock Park") {
      this.destinationsRouteCongestionRate = ["San Jose State University"];
    } else if(newObj == "San Jose State University") {
      this.destinationsRouteCongestionRate = ["1302,The Alameda", "Alum Rock Park", "Casa Verde Street ", "Mineta San Jose International Airport", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131", "Avaya Stadium", "DMV San Jose", "MapR Technologies, 350 Holger Way", "Winchester Mystery House", "Santana Row"];
    } else if(newObj == "Mineta San Jose International Airport") {
      this.destinationsRouteCongestionRate = ["1302,The Alameda", "Casa Verde Street ", "San Jose State University"];
    } else if(newObj == "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131") {
      this.destinationsRouteCongestionRate = ["San Jose State University"];
    } else if(newObj == "Avaya Stadium") {
      this.destinationsRouteCongestionRate = ["San Jose State University"];
    } else if(newObj == "DMV San Jose") {
      this.destinationsRouteCongestionRate = ["San Jose State University"];
    } else if(newObj == "MapR Technologies, 350 Holger Way") {
      this.destinationsRouteCongestionRate = ["San Jose State University"];
    } else if(newObj == "Winchester Mystery House") {
      this.destinationsRouteCongestionRate = ["San Jose State University"];
    } else if(newObj == "N 1st Street") {
      this.destinationsRouteCongestionRate = ["Santana Row", "Downtown San Jose"];
    } else if(newObj == "Santana Row") {
      this.destinationsRouteCongestionRate = ["N 1st Street ", "San Jose State University"];
    } else if(newObj == "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131") {
      this.destinationsRouteCongestionRate = ["Casa Verde Street "];
    } else if(newObj == "Downtown San Jose") {
      this.destinationsRouteCongestionRate = ["N 1st Street "];
    } else if(newObj == "1302,The Alameda") {
      this.destinationsRouteCongestionRate = ["Mineta San Jose International Airport", "San Jose State University"];
    } else {
      this.destinationsRouteCongestionRate = ["Choose a proper source"];
    }
  }

  modelChangedStreetCongestionRate(newObj: any) {
    if(newObj == "Capitol Av N") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "Capitol Av S") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "N 1st St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S 1st Street") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "E Santa Clara St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "W Santa Clara St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "E San Fernando St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "W San Fernando St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "E Trimble Rd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "W Trimble Rd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "E Tasman Dr") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "W Tasman Dr") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Zanker Rd") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "Stevens Creek Blvd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Berryessa Rd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "E Brokaw Rd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "E San Salvador St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "McCarthy Blvd") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "Coleman Av") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "N Market St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "Senter Rd") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "E San Antonio St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "N 2nd St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S 2nd St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "N 3nd St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S 3nd St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "N 7nd St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S 7nd St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "Charcot Av") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Airport Blvd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Penitencia Creek Rd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Alum Rock Falls Rd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Baypointe Pkwy") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Automation Pkwy") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "N Autumn St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S Autumn St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "Stockton Av") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "White Rd N") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "White Rd S") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "N 4th St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S 4th St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "N 10th St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S 10th St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "N 11th St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S 11th St") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "E St James St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "W St James St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "E Julian St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "W Julian St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Zanker Rd") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S Baywood Av") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Trade Zone Blvd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Lundy Ave") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "Almaden Blvd") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "Notre Dame Av") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "Calaveras Blvd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "S Winchester Blvd") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "W San Carlos St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "N 5th Street") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S 5th Street") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "N 6th Street") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "S 6th Street") {
      this.directionsCongestionRate = ["North", "South"];
    } else if(newObj == "San Tomas Expressway") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Montague Expressway") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "CA-237 W") {
      this.directionsCongestionRate = ["West"];
    } else if(newObj == "CA-237 E") {
      this.directionsCongestionRate = ["East"];
    } else if(newObj == "CA-87 S") {
      this.directionsCongestionRate = ["South"];
    } else if(newObj == "CA-87 N") {
      this.directionsCongestionRate = ["North"];
    } else if(newObj == "US-101 S") {
      this.directionsCongestionRate = ["South"];
    } else if(newObj == "US-101 N") {
      this.directionsCongestionRate = ["North"];
    } else if(newObj == "I-880 S") {
      this.directionsCongestionRate = ["South"];
    } else if(newObj == "I-880 N") {
      this.directionsCongestionRate = ["North"];
    } else if(newObj == "I-680 S") {
      this.directionsCongestionRate = ["South"];
    } else if(newObj == "I-280 N") {
      this.directionsCongestionRate = ["North"];
    } else if(newObj == "I-680 N") {
      this.directionsCongestionRate = ["North"];
    } else if(newObj == "I-280 S") {
      this.directionsCongestionRate = ["South"];
    } else if(newObj == "Tisch Way") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "I-280 N") {
      this.directionsCongestionRate = ["North"];
    } else if(newObj == "Holger Way") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Parrott St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Keyes St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Virginia St") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "McKee Rd") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Toyon Av") {
      this.directionsCongestionRate = ["North","South"];
    } else if(newObj == "River Oaks Pkwy") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "McKay Dr") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Casa Verde St") {
      this.directionsCongestionRate = ["North","South"];
    } else if(newObj == "Hatton St") {
      this.directionsCongestionRate = ["North","South"];
    } else if(newObj == "Olsen Dr") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Santana Row") {
      this.directionsCongestionRate = ["North","South"];
    } else if(newObj == "Skyport Dr") {
      this.directionsCongestionRate = ["East", "West"];
    } else if(newObj == "Orchard Pkwy") {
      this.directionsCongestionRate = ["North","South"];
    } else if(newObj == "S 9th Street") {
      this.directionsCongestionRate = ["North","South"];
    } else if(newObj == "N 9th Street") {
      this.directionsCongestionRate = ["North","South"];
    } else if(newObj == "S 8th Street") {
      this.directionsCongestionRate = ["North","South"];
    } else if(newObj == "N 8th Street") {
      this.directionsCongestionRate = ["North","South"];
    }
  }

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
    this.showProgress1 = true;
    this.statusCode = null;
    this.homeGraphService.routeTravelTimeMethod(this.routeGraphTravelTime)
      .subscribe(successCode => {
        this.showProgress1 = false;
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

    this.showProgress2 = true;
    this.statusCode = null;
    this.homeGraphService.routeCongestionTimeMethod(this.routeGraphCongestionRate)
      .subscribe(successCode => {
        this.showProgress2 = true;
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

  getStreetCongestionRate(streetCongestionRateForm: NgForm) {
    this.options3 = {
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

    this.showProgress3 = true;
    this.statusCode = null;
    this.homeGraphService.streetCongestionTimeMethod(this.routeGraphStreetCongestionRate)
      .subscribe(successCode => {
        this.showProgress3 = true;
        this.graphDataStreetCongestionRate = successCode;
        this.data3 = [
          {
            values: this.graphDataStreetCongestionRate,
            key: 'Congestion Rate',
            color: '#7777ff',
            area: true
          }
        ];
        console.log(this.graphDataStreetCongestionRate);
      }, errorCode => this.statusCode = errorCode)
  }
}
