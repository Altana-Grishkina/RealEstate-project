import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../model/iproperty';
import { IPropertyBase } from '../model/ipropertybase';
import { Observable } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getProperty(id: number){
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        // throw new Error('Some error');
        return propertiesArray.find(p => p.Id === id);
      })
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]>{
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<Property> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp'));
        if(localProperties){
          for(const id in localProperties) {
            if(SellRent){
            if(localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
              propertiesArray.push(localProperties[id as keyof string]);
            }
          } else {
            propertiesArray.push(localProperties[id as keyof string]);
          }
          }
        }
        for(const id in data) {
          if(SellRent){
          if(data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            propertiesArray.push(data[id as keyof string]);
          }
         } else {
            propertiesArray.push(data[id as keyof string]);
         }
        }
        return propertiesArray;
      })
    );

    return this.http.get<Property[]>('data/properties.json');
  }
  addProperty(property: Property){
    let newProp = [property];

    //Add new  property in array in newProp already exists in local storage
    if(localStorage.getItem('newProp')){
      newProp = [property,
                  ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropId() {
    if(localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') +1));
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
