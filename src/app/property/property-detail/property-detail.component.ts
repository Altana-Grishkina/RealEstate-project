import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  public propertyId!: number;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data) => {
        this.property = data['prp'];
      }
    );

    //changes number of property on this component
    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyId = +params['id'];
    //     this.housingService.getProperty(this.propertyId).subscribe(
    //       (data: any) => {
    //         this.property = data;
    //       }, error => this.router.navigate(['/'])
    //     );
    //   }
    // )

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/img/gallery/1-small.jpeg',
        medium: 'assets/img/gallery/1-medium.jpeg',
        big: 'assets/img/gallery/1-big.jpeg'
      },
      {
        small: 'assets/img/gallery/2-small.jpeg',
        medium: 'assets/img/gallery/2-medium.jpeg',
        big: 'assets/img/gallery/2-big.jpeg'
      },
      {
        small: 'assets/img/gallery/3-small.jpeg',
        medium: 'assets/img/gallery/3-medium.jpeg',
        big: 'assets/img/gallery/3-big.jpeg'
      },{
        small: 'assets/img/gallery/4-small.jpeg',
        medium: 'assets/img/gallery/4-medium.jpeg',
        big: 'assets/img/gallery/4-big.jpeg'
      },
      {
        small: 'assets/img/gallery/5-small.jpeg',
        medium: 'assets/img/gallery/5-medium.jpeg',
        big: 'assets/img/gallery/5-big.jpeg'
      }
    ];
  }

}
