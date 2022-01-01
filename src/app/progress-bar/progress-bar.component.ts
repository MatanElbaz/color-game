import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  private _progressInPrecent?: number;
  @Input()
  public colorVotes:any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

  }

  @Input()
  set progressInPrecent(progressInPrecent: number) {
    this._progressInPrecent = progressInPrecent;
    this.setProgress();
  }

  setProgress() {
    this.elementRef.nativeElement.style.setProperty('--progress-in-percent', this._progressInPrecent + "%")
  }
}
