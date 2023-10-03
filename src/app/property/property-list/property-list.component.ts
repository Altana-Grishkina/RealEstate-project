
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  SellRent = 1;
  properties: IPropertyBase[];

  constructor(private route: ActivatedRoute,private housingService: HousingService){}

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()) {
      this.SellRent = 2; //Means we are on rent-property URL else we are on base URL
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data=>{
          this.properties=data;
          console.log(data);
      }, errore => {
        console.log(errore);
      }
    )
    // this.http.get('data/properties.json').subscribe(
    // data=>{
    //   this.properties=data;
    //   console.log(data);
    // }

    // );
  }
}
