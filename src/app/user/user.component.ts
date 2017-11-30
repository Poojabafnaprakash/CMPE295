import { Component, OnInit } from '@angular/core';
import { UserInput } from './model/userInput';
import { NgForm } from '@angular/forms';
import { UserUpdateService } from './user.services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	userInput: UserInput;
	statusCode: number;
   constructor(private userUpdateService: UserUpdateService) {
   this.userInput = new UserInput('', '', '','','','',1,1); 
   }

  ngOnInit() {
  }


  updateProfile(userInputForm: NgForm) {
  	this.statusCode = null;
    this.userUpdateService.updateProfile(this.userInput)
      .subscribe(successCode => {
        window.alert('Updated Profile' + successCode);
      },
      errorCode => this.statusCode = errorCode);
  }

}
