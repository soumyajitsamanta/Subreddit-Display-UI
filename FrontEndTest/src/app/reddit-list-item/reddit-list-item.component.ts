import { Component, Input, OnInit } from '@angular/core';
import { SubredditPostDetails } from '../services/reddit-api.service';

@Component({
  selector: 'app-reddit-list-item',
  templateUrl: './reddit-list-item.component.html',
  styleUrls: ['./reddit-list-item.component.scss']
})
export class RedditListItemComponent implements OnInit {

  @Input("item")
  public item!: SubredditPostDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
