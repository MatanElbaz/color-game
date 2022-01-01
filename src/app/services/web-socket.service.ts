import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { ColorService } from './color.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  colors: Color[] = [];

  constructor(private colorService: ColorService) { }
  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/colors');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const colorDto = JSON.parse(event.data);

      this.colors = this.colors.map(c => c.id !== colorDto.id ? c : colorDto);

      if (colorDto.colorVotes > this.colorService.maxVoted) {
        this.colorService.maxVoted = colorDto.colorVotes;
      }

    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(colorDto: Color, id: any) {
    this.webSocket.send(JSON.stringify(colorDto));

  }


  public closeWebSocket() {
    this.webSocket.close();
  }

}
