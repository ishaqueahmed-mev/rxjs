import { Component } from '@angular/core';
import { fromEvent, of } from "rxjs";
import { map, filter, take, scan } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'damnRxJs';
  button;
  dataSource;

  ngOnInit() {
    this.button = document.querySelector('button')
    fromEvent(this.button, 'click').subscribe(event => {
      console.log(event)
      let arrData = [{
        id: 1, title: 'One1'
      }, {
        id: 2, title: 'Two2'
      }, {
        id: 3, title: 'Three3'
      }, {
        id: 4, title: 'Four4'
      }, {
        id: 5, title: 'Five5'
      }, {
        id: 6, title: 'Six6'
      }, {
        id: 7, title: 'Seven7'
      }, {
        id: 8, title: 'Eight8'
      }, {
        id: 9, title: 'Nine9'
      }, {
        id: 10, title: 'Ten10'
      }, {
        id: 11, title: 'Eleven11'
      }]
      this.dataSource = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12).pipe(
        take(5),
        map(value => value * 2),
        // filter(value => value >= 4)
      ).subscribe(value => console.log(value))
      // this.dataSource.subscribe(value => console.log(value))

      of(arrData).pipe(
        take(5)
      ).subscribe(value => console.log(value))
    })

  }
}
