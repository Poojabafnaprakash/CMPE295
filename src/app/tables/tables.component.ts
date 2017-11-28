import { Component, OnInit } from '@angular/core';
import { UserInputForPresent } from './model/userInputForPresent';
import { UserInputForFuture } from './model/userInputForFuture';
import { UserInput } from './model/userInput';
import { TablesService } from './tables.services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

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
    public testData:any;
    public tableDataFlag:boolean = false;
    public tableDataFFlag:boolean = false;
    public userInputData : UserInputForPresent;
    public userInputDataF : UserInputForFuture;

  constructor(private tablesService:TablesService) { }

  ngOnInit() {
    this.userInputData = new UserInputForPresent('', '', '');
    this.userInputDataF = new UserInputForFuture('', '', '','');
}

getCongestionDetailValue () {
  var obj = {
     "source": this.userInputData.source,
     "destination": this.userInputData.destination,
     "time" : this.userInputData.time
   }
   
  this.tablesService.congestionDetailPresent(obj).subscribe((data) => {
    if(data != undefined && data != '') {
     console.log('inside final data********');
     console.log(data);
     this.tableData1 = {
        headerRow: [ 'S.No.', 'Street Name', 'Direction', 'Congestion Rate', 'Expected Time Delay'],
        dataRows: data
      };
      this.tableDataFlag = true;
    }
  })

}


getCongestionDetailValueForFuture () {
  var obj = {
     "source": this.userInputDataF.source,
     "destination": this.userInputDataF.destination,
     "day": this.userInputDataF.day,
     "time" : this.userInputDataF.time
   }
   
    this.tablesService.congestionDetailFuture(obj).subscribe((data) => {
    if(data != undefined && data != '') {
     console.log('inside final data********');
     console.log(data);
     this.tableData2 = {
          headerRow: [ 'S.No.', 'Street Name', 'Direction', 'Congestion Rate', 'Expected Time Delay'],
          dataRows: data
      };
      this.tableDataFFlag = true;
    }
  })
}

  submitCPForm(presentCongestionForm: NgForm) {
    console.log("write the post request");
    console.log(this.userInputData.source);
    this.getCongestionDetailValue();
  }

  submitCFForm(futureCongestionForm: NgForm) {
    console.log("write the post request");
    console.log(this.userInputDataF.source);
    this.getCongestionDetailValueForFuture();
  }

}

