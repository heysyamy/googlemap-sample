
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  private markers = [];
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }
  
  ionViewDidLoad(){
      console.log("ionview did load");
      this.loadMap();
  }
  addMarker(latLng){
    console.log("add marker log");
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
      });
    let content = "<h4>Information!</h4>";
    this.markers.push(marker);
    console.log(this.markers);
    this.addInfoWindow(marker, content);
  };

  addInfoWindow(marker, content){
    console.log("info window log");
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', ()=> {infoWindow.open(this.map, marker);});
  };

  loadMap(){
    console.log("load map log");
    this.geolocation.getCurrentPosition().then((position)=> {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(latLng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement,
        mapOptions);
      
      google.maps.event.addListener(this.map, 'click', (event)=> {this.addMarker(event.latLng);});
          
    }, (err)=> {console.log(err);});
    
  }
  
}
