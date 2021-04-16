import { Component, OnInit } from '@angular/core';
import { NewsApiService, Article } from '../news-api.service';

@Component({
  selector: 'app-world-news',
  templateUrl: './world-news.component.html',
  styleUrls: ['./world-news.component.css'],
})
export class WorldNewsComponent implements OnInit {
  articles: Article[];
  currentPage: number;
  noPages: number;

  constructor(private newsServ: NewsApiService) {}

  ngOnInit(): void {
    //gets the list of articles which are hardcoded = 9
    this.newsServ.pageOutout.subscribe((articles) => {
      this.articles = articles;
    });

    //to set the intital page request
    this.newsServ.pageInput.next(this.currentPage);

    //to get the number of pages
    this.newsServ.numberOfPages.subscribe((pageNo) => {
      this.noPages = pageNo * 10;
      console.log(this.noPages);
    });
  }

  pageChanged({ page }): void {
    this.currentPage = page;
    this.newsServ.pageInput.next(page);
    console.log(page);
  }
}
