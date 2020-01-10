import { Component, OnInit } from '@angular/core';
import { take, map, combineAll, pairwise, delay, sequenceEqual, switchMap } from "rxjs/operators";
import { interval, of, zip, from } from "rxjs";
import { HttpService } from "../http.service";

@Component({
  selector: 'app-combinations',
  templateUrl: './combinations.component.html',
  styleUrls: ['./combinations.component.scss']
})
export class CombinationsComponent implements OnInit {

  source$;
  example$;
  allRequest = []
  constructor(
    private hs: HttpService
  ) { }

  ngOnInit() {

    // setInterval(() => console.log(new Date().getSeconds()), 1000)

    this.source$ = interval(1000).pipe(take(2));
    this.example$ = this.source$.pipe(
      map(val =>
        interval(1000).pipe(
          map(i => `Result (${val}) : ${i}`),
          take(5)
        )
      )
    )

    this.example$.pipe(combineAll()).subscribe(console.log)

    interval(1)
      .pipe(
        pairwise(),
        take(5)
      )
      .subscribe(console.log);

    const sourceOne = of('Hello');
    const sourceTwo = of('World!');
    const sourceThree = of('Goodbye');
    const sourceFour = of('World!');
    //wait until all observables have emitted a value then emit all as an array


    const example = zip(
      sourceOne,
      sourceTwo.pipe(delay(1000)),
      sourceThree.pipe(delay(2000)),
      sourceFour.pipe(delay(8000))
    );
    const subscribe = example.subscribe(val => console.log('ZIP EG :: ', val));

    const expectedSequence = from([4, 5, 6]);

    of([1, 2, 3], [4, 5, 6], [7, 8, 9])
      .pipe(switchMap(arr => from(arr).pipe(sequenceEqual(expectedSequence))))
      .subscribe(rslt => console.log('SEQUENCE EQUAL :: ', rslt));

    this.hs.getMeMF().subscribe(result => {
      this.allRequest.push(result)
      console.log(this.allRequest)
    })


  }

}
