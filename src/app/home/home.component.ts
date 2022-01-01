import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ColorService } from '../services/color.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  colors?: Color[];
  findedColors: Color[] = [];
  colorId?: number;


  constructor(public webSocketService: WebSocketService, private colorService: ColorService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
    this.getAllColors()
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  getAllColors(): any {
    let obsOfColors: Observable<Color[]> = this.colorService.getAllColors();
    obsOfColors.subscribe(
      arr => {
        this.colors = arr;
        this.findedColors = [];
        for (const c of this.colors) {
          this.checkMaxVote(c.colorVotes!)
          this.findedColors.push(c);
        }
        this.webSocketService.colors = this.findedColors;

      }
    )
  }
  checkMaxVote(colorVotes: number) {
    if (colorVotes > this.colorService.maxVoted) {
      this.colorService.maxVoted = colorVotes;
      console.log(this.colorService.maxVoted);

    }
  }
  calculateValue(votes: number) {
    return 100 * (votes / this.colorService.maxVoted)
  }

  addVote(id: any) {
    let obsOfColors: Observable<any> = this.colorService.addColorVote(id);
    obsOfColors.subscribe(color => {
      this.webSocketService.sendMessage(color, Number(id));

      // this.findedColors?.forEach(element => {
      //   if (element.id == id) {
      //     element.colorVotes = color.colorVotes;
      //     this.checkMaxVote(color.colorVotes);
      //   }
      // });
    })
  }

}
