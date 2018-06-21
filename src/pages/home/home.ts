import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PusherServiceProvider } from '../../providers/pusher-service/pusher-service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  comments = [];
  message: string;
  url: string = 'http://localhost:4000/message'
  rating = {
    bad : 0,
    good : 0,
  }

  constructor(public navCtrl: NavController, public pusher : PusherServiceProvider, public http : HttpClient) {}


  sendMessage(){
    if(this.message != ''){
      this.http.post(this.url, {message : this.message}).subscribe((res : any) => {
        this.message = '';
      })
    }
  }


  ionViewDidLoad(){
    const channel = this.pusher.init();
    channel.bind('message', (data) => {
      if(data.score >= 1){
        this.rating.good = this.rating.good + 1;
      }
      else{
        this.rating.bad = this.rating.bad + 1;
      }
      this.comments.push(data);
    })
  }

}
