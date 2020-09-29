import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IRating} from '../irating';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})
export class RatingBarComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit(): void {
    this.calculate(this.max, this.ratingValue);
  }

  @Input()
  max = 5;

  @Input()
  ratingValue = 5;

  @Input()
  showRatingValue = true;

  ratingList: Array<IRating> = [];

  calculate(max, ratingValue) {
    this.ratingList = Array.from({length: max},
      (_, index) => ({
        value: index + 1,
        active: index < ratingValue
      }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('max' in changes) {
      let max = changes.max.currentValue;
      max = typeof max === 'undefined' ? 5 : max;
      this.max = max;
      this.calculate(max, this.ratingValue);
    }
  }

  @Output()
  rateChange = new EventEmitter<number>();


  select(index) {
    let ISelect = index + 1;
    if (this.ratingValue == ISelect){
      this.ratingValue = 0;
      this.showRatingValue = false;
    }else {
      this.ratingValue = index + 1;
      this.showRatingValue = true;
    }
    this.ratingList.forEach((item, idx) =>
      item.active = idx < this.ratingValue);
    this.rateChange.emit(this.ratingValue);
  }

  enter(index) {
    this.ratingList.forEach((item, idx) =>
      item.active = idx <= index);
  }

  reset() {
    this.ratingList.forEach((item, idx) =>
      item.active = idx < this.ratingValue);
  }

}
