import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SubredditResponse } from '../services/reddit-api.service';

@Component({
  selector: 'app-reddit-list-container',
  templateUrl: './reddit-list-container.component.html',
  styleUrls: ['./reddit-list-container.component.scss']
})
export class RedditListContainerComponent 
implements OnInit, OnChanges 
{

  @Input("subredditData")
  public subredditData!:SubredditResponse;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("CHANGE");
    console.warn(changes);
    
    
  }

  ngOnInit(): void {
    console.log("INIT");
    
  }

}
