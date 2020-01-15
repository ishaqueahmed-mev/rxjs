import { Component, OnInit, ApplicationRef } from '@angular/core';
import { take, map, combineAll, pairwise, delay, sequenceEqual, switchMap, debounceTime, distinctUntilKeyChanged, distinct, distinctUntilChanged } from "rxjs/operators";
import { interval, of, zip, from, generate, range, timer, fromEvent } from "rxjs";
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
  searchArray = []
  oldArr;
  newArr;
  constructor(
    private hs: HttpService
  ) { }

  callAsync(a, b) {
    console.log('ARGUMENTS :: ', [...arguments])
    return {a, b}
  }

  callSync(a, b) {
    return {b, a}
  }

  ngOnInit() {
    this.hs.callSubject()

    for (let i = 1; i < 50; i++) this.searchArray.push(`test ${i}`);

    // THIS IS REAL SHIT
    let send = this.searchArray.length > 0 ? this.callAsync : this.callSync;
    console.log(send('damn', 'you'))

    this.newArr = this.oldArr = [...this.searchArray];
    let searchBox = document.getElementById('search');
    fromEvent(searchBox, 'keyup').pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(500),
      // distinctUntilChanged() // Good thing
    ).subscribe(rslt => {
      console.log(new Date().getSeconds())
      this.searchArray = this.newArr.filter((x, ind) => {
        if (x.includes(rslt.trim())) return this.oldArr[ind]
      })
    })

    // setInterval(() => console.log(new Date().getSeconds()), 1000)
    generate(2, x => x <= 38, x => x + 3, x => '.'.repeat(x)).subscribe(console.log);
    range(2, 10).subscribe(val => console.log(val));

    // timer(1000, 3000).subscribe(val => console.log(val));

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


    // ZIP
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

    // interval(1000).subscribe(val => console.log(val));

    const expectedSequence = from([4, 5, 6]);

    of([1, 2, 3], [4, 5, 6], [7, 8, 9])
      .pipe(switchMap(arr => from(arr).pipe(sequenceEqual(expectedSequence))))
      .subscribe(rslt => console.log('SEQUENCE EQUAL :: ', rslt));

    // this.hs.getMeMF().subscribe(result => {
    //   this.allRequest.push(result)
    //   console.log(this.allRequest)
    // })


  }

}
