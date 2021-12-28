import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  colors?: Color[];
  findedColors?: Color[];
  colorId?: number;

  maxVoted: number = 0;

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.getAllColors()
  }

  getAllColors() {
    let obsOfColors: Observable<Color[]> = this.colorService.getAllColors();

    obsOfColors.subscribe(
      arr => {
        this.colors = arr;
        this.findedColors = [];
        for (const c of this.colors) {
          this.checkMaxVote(c.colorVotes!)
          this.findedColors.push(c);
        }
      }
    )
  }
  checkMaxVote(colorVotes: number) {
    if (colorVotes > this.maxVoted) {
      this.maxVoted = colorVotes;
    }
  }
  calculateValue(votes: number) {
    return 100 * (votes / this.maxVoted)
  }

  addVote(id: any) {
    let obsOfColors: Observable<any> = this.colorService.addColorVote(id);
    obsOfColors.subscribe(color => {
      this.findedColors?.forEach(element => {
        if (element.id == id) {
          element.colorVotes = color.colorVotes;
          this.checkMaxVote(color.colorVotes);
        }
      });
    })
  }

}
