import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/tabset.component';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('formTabs') formTabs!: TabsetComponent;

  //Will come  from masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']

  propertyView: IPropertyBase = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack(){
    this.router.navigate(['/']);
  }

  onSubmit(Form : NgForm){
    console.log("Congrats, form Submitted");
    console.log(this.addPropertyForm);
    console.log("SellRent="+this.addPropertyForm.value.BasicInfo.SellRent);
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }
}
