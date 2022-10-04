import { Component, OnInit } from '@angular/core';
import { RedditApiService, SubredditResponse } from './services/reddit-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public subredditData!:SubredditResponse;
  public subredditDataShow: boolean = false;

  constructor(private redditApi: RedditApiService) {
  }

  ngOnInit(): void {
    const tokenData = this.redditApi.fetchAuthTokenFromStorage();
    if (!this.redditApi.isValidAuthTokenFromStorage(tokenData)) {
      const token = this.redditApi.getAuthorizationToken()
      .subscribe({
        next: next => {
          this.redditApi.setAuthTokenToStorage(next);
          this.redditApi.getPostsFromAwwSubreddit()
          .subscribe({next: value => {
            this.loadSubredditData(value);
          }, error:console.error});
        },
        error: err => console.error("Error in authenticating:" + err)
      });
    } else {
      this.redditApi.getPostsFromAwwSubreddit()
      .subscribe({next: value => {
        this.loadSubredditData(value);
      }, error:console.error});
    }
  }

  loadSubredditData(subredditData:SubredditResponse){
    this.subredditData = subredditData;
    this.subredditDataShow = true;
    console.log(subredditData);
  }
}
