import {Component, OnInit} from '@angular/core';
import {UserInputForPresent} from './model/userInputForPresent';
import {UserInputForFuture} from './model/userInputForFuture';
import {TablesService} from './tables.services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})

export class TablesComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  public tableDataFlag: boolean = false;
  public tableDataFFlag: boolean = false;
  public userInputData: UserInputForPresent;
  public userInputDataF: UserInputForFuture;
  sources:any;
  destinations:any;
  showProgress:boolean = false;


  constructor(private tablesService: TablesService) {
  }

  ngOnInit() {
    this.userInputData = new UserInputForPresent("", "", "", "");
    this.sources = ["Casa Verde Street ", "Alum Rock Park", "San Jose State University", "Avaya Stadium", "DMV San Jose", "MapR Technologies, 350 Holger Way", "Winchester Mystery House", "N 1st Street ", "Santana Row", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131", "Downtown San Jose", "1302,The Alameda", "Mineta San Jose International Airport"];
    this.destinations = [""];
    this.userInputDataF = new UserInputForFuture('', '', '', '');
  }

  modelChanged(newObj: any) {
    if(newObj == "Casa Verde Street") {
      this.destinations = ["Mineta San Jose International Airport", "San Jose State University", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131"];
    } else if(newObj == "Alum Rock Park") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "San Jose State University") {
      this.destinations = ["1302,The Alameda", "Alum Rock Park", "Casa Verde Street ", "Mineta San Jose International Airport", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131", "Avaya Stadium", "DMV San Jose", "MapR Technologies, 350 Holger Way", "Winchester Mystery House", "Santana Row"];
    } else if(newObj == "Mineta San Jose International Airport") {
      this.destinations = ["1302,The Alameda", "Casa Verde Street ", "San Jose State University"];
    } else if(newObj == "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "Avaya Stadium") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "DMV San Jose") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "MapR Technologies, 350 Holger Way") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "Winchester Mystery House") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "N 1st Street") {
      this.destinations = ["Santana Row", "Downtown San Jose"];
    } else if(newObj == "Santana Row") {
      this.destinations = ["N 1st Street ", "San Jose State University"];
    } else if(newObj == "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131") {
      this.destinations = ["Casa Verde Street "];
    } else if(newObj == "Downtown San Jose") {
      this.destinations = ["N 1st Street "];
    } else if(newObj == "1302,The Alameda") {
      this.destinations = ["Mineta San Jose International Airport", "San Jose State University"];
    } else {
      this.destinations = ["Choose a proper source"];
    }
  }

// getCongestionDetailValueForFuture () {
//   var obj = {
//      "source": this.userInputDataF.source,
//      "destination": this.userInputDataF.destination,
//      "day": this.userInputDataF.day,
//      "time" : this.userInputDataF.time
//    }
//
//     this.tablesService.congestionDetailFuture(obj).subscribe((data) => {
//     if(data != undefined && data != '') {
//      console.log('inside final data********');
//      console.log(data);
//      this.tableData2 = {
//           headerRow: [ 'S.No.', 'Street Name', 'Direction', 'Congestion Rate'],
//           dataRows: data
//       };
//       this.tableDataFFlag = true;
//     }
//   })
// }

  congestionDetailsFormMethod() {
    this.showProgress = true;
    this.tablesService.congestionDetailPresent(this.userInputData).subscribe((data) => {
      this.showProgress = false;
      if (data != undefined && data != '') {
        console.log(data);
        this.tableData1 = {
          headerRow: ['S.No.', 'Street Name', 'Direction', 'Congestion Rate'],
          dataRows: data
        };
        this.tableDataFlag = true;
      }
    })
  }

  // submitCPForm(presentCongestionForm: NgForm) {
  //   console.log("write the post request");
  //   console.log(this.userInputData.source);
  //   this.getCongestionDetailValue();
  // }
  //
  // submitCFForm(futureCongestionForm: NgForm) {
  //   console.log("write the post request");
  //   console.log(this.userInputDataF.source);
  //   this.getCongestionDetailValueForFuture();
  // }

}

