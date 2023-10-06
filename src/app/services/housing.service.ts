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

  getAllProperties(SellRent: number): Observable<IProperty[]>{
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<IProperty> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp'));
        if(localProperties){
          for(const id in localProperties) {
            if(localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
              propertiesArray.push(localProperties[id as keyof string]);
            }
          }
        }
        for(const id in data) {
          if(data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            propertiesArray.push(data[id as keyof string]);
          }
        }
        return propertiesArray;
      })
    );

    return this.http.get<IProperty[]>('data/properties.json');
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
