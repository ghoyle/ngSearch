import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {jsonpFactory} from '@angular/http/src/http_module';

export interface ArtistInfo {
  name: string;
  img: string;
  type: string;
}

export const searchUrl = 'https://ufhsub9629-dsn.algolia.net/1/indexes/search/query?x-algolia-application-id=UFHSUB9629&x-algolia-api-key=69ed687a250f4c895cc73f6ee142a42e';

const httpOptions = {
    headers: new HttpHeaders({
        'x-refresh':  'true'
    })
};

@Injectable()
export class ArtistSearchService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  search (artistName: string, refresh = false): Observable<ArtistInfo[]> {
    // clear if no pkg name
    if (!artistName.trim()) { return of([]); }

    const options = {
        'query': artistName,
        'hitsPerPage': '6',
        'filters': 'type:artists'
    };


    // TODO: Add error handling
    return this.http.post(searchUrl, options).pipe(
      map((data: any) => {
          console.log(data);
        return data.hits.map(entry => ({
            name: entry.title_en,
            img: entry.img
          } as ArtistInfo )
        );
      }),
      catchError(this.handleError('search', []))
    );
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
