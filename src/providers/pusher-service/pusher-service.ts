
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare const Pusher: any;

@Injectable()
export class PusherServiceProvider {
  channel;
  constructor(public http: HttpClient) {
  var pusher = new Pusher('3ce906fdf0966d8a86bf', { 
  cluster: 'eu',
  encrypted: true,
  });
  this.channel = pusher.subscribe('chat');
}


public init(){
   return this.channel;
}

}