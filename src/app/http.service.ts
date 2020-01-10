import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { concat, zip, of, merge, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  headers = new HttpHeaders({
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwic3RhdHVzIjowfSwiaWF0IjoxNTc4NTY3OTQ3LCJleHAiOjE1Nzg1ODk1NDd9.pLPG366sPFyka4uCe3SmK9AgvB8pxhAI4i6tD1zgh8E'
  })

  getMeMF() {
    // return concat(
    //   of(1, 2, 3),
    //   of(4, 5, 6),
    //   of(7, 8, 9, 12)
    // )
    let me = this.http.post('http://206.189.135.176/clisson-server/api/varietyCategory/list', '', { headers: this.headers })
    return concat(
      me,
      this.http.post('http://206.189.135.176/clisson-server/api/variety/list', '', { headers: this.headers }),
      this.http.post('http://206.189.135.176/clisson-server/api/recipe/list', '', { headers: this.headers })
    )
  }
}
