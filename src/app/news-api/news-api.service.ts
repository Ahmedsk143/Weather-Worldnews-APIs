import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap, pluck } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
interface newsResponse {
  totalResults: number;
  articles: Article[];
}
@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  endPoint = 'https://newsapi.org/v2/top-headlines';
  pageInput: Subject<number>;
  pageOutout: Observable<Article[]>;
  numberOfPages: Subject<number>;

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject();
    this.pageInput = new Subject<number>();
    this.pageOutout = this.pageInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey', '19451319911d43daa72e501671f100ed')
          .set('country', 'us')
          .set('pageSize', '9')
          .set('page', String(page))
          .set('category', 'technology');
      }),
      switchMap((params) => {
        return this.http.get<newsResponse>(this.endPoint, { params });
      }),
      tap((response) => {
        const totalPages = Math.ceil(response.totalResults / 9);
        this.numberOfPages.next(totalPages);
      }),
      pluck('articles')
    );
  }
}
