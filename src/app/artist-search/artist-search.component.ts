import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ArtistInfo, ArtistSearchService } from './artist-search.service';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.scss'],
  providers: [ ArtistSearchService ]
})
export class ArtistSearchComponent implements OnInit {
  withRefresh = false;
  artists$: Observable<ArtistInfo[]>;
  private searchText$ = new Subject<string>();

  search(artistName: string) {
    this.searchText$.next(artistName);
  }

  ngOnInit() {
    this.artists$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(artistName =>
        this.searchService.search(artistName, this.withRefresh))
    );
  }

  constructor(private searchService: ArtistSearchService) { }


  toggleRefresh() { this.withRefresh = ! this.withRefresh; }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/