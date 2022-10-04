import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface AuthorizationTokenResponse {
  "access_token": string;
  "token_type": string;
  "expires_in": number;
  "scope": string;
  "dateRequest": string;
}

@Injectable({
  providedIn: 'root'
})
export class RedditApiService {

  private readonly redditBaseUrl = "https://www.reddit.com";
  private readonly oauthReddit = "https://oauth.reddit.com";
  private readonly redirectUrl = "https://localhost:4200";

  constructor(private httpClient: HttpClient) { }

  fetchAuthTokenFromStorage() {
    const reddit_token = localStorage.getItem("reddit_token") || "{}";
    return JSON.parse(reddit_token) as AuthorizationTokenResponse;
  }
  setAuthTokenToStorage(response: AuthorizationTokenResponse) {
    response.dateRequest = new Date().toISOString();
    localStorage.setItem("reddit_token", JSON.stringify(response));
  }

  isValidAuthTokenFromStorage(token: AuthorizationTokenResponse) {
    if (!token || !token.dateRequest) {
      return false;
    }
    const issuedDate = new Date(token.dateRequest);
    const todaysDate = new Date();
    const diffInSeconds = (todaysDate.getTime() - issuedDate.getTime()) / 1000;
    if (diffInSeconds > token.expires_in) {
      return false;
    }
    return true;
  }

  getAuthorizationToken() {
    const headers = new HttpHeaders()
      .append("Authorization", "Basic " + btoa(environment.appId + ":" + environment.appSecret))
      .append("Content-Type", "application/x-www-form-urlencoded")

    const body = this.encodeFormObject([{ key: "grant_type", value: "client_credentials" }]);
    return this.httpClient
      .post<AuthorizationTokenResponse>(this.redditBaseUrl + "/api/v1/access_token", body,
        { headers: headers });
  }

  getPostsFromAwwSubreddit() {
    const headers = new HttpHeaders()
      .append("Authorization", "Bearer " + this.fetchAuthTokenFromStorage().access_token);

    return this.httpClient.get<SubredditResponse>(this.oauthReddit + "/r/aww/new", { headers: headers });
  }

  private encodeFormObject(body: { key: string, value: string }[]) {
    return body.map(kv => this.encodeFormKeyValue(kv.key, kv.value)).join("&");
  }

  private encodeFormKeyValue(key: string, value: string) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }
}

export interface SubredditPostDetails {
  kind: string;
  data: {
    "all_awardings": any[];
    "allow_live_comments": any;
    "approved_at_utc": any;
    "approved_by": any;
    "archived": boolean;
    "author_flair_background_color": any;
    "author_flair_css_class": any;
    "author_flair_richtext": any[];
    "author_flair_template_id": any;
    "author_flair_text_color": any;
    "author_flair_text": any;
    "author_flair_type": any;
    "author_fullname": string;
    "author_is_blocked": boolean;
    "author_patreon_flair": boolean;
    "author_premium": boolean;
    "author": string;
    "awarders": any[];
    "banned_at_utc": any;
    "banned_by": any;
    "can_gild": boolean;
    "can_mod_post": boolean;
    "category": any;
    "clicked": boolean;
    "content_categories": any;
    "contest_mode": boolean;
    "created_utc": Date;
    "created": Date;
    "discussion_type": any;
    "distinguished": any;
    "domain": string;
    "downs": number;
    "edited": boolean;
    "gilded": number;
    "gildings": {};
    "hidden": boolean;
    "hide_score": boolean;
    "id": string;
    "is_created_from_ads_ui": boolean;
    "is_crosspostable": boolean;
    "is_meta": boolean;
    "is_original_content": boolean;
    "is_reddit_media_domain": boolean;
    "is_robot_indexable": boolean;
    "is_self": boolean;
    "is_video": boolean;
    "likes": any;
    "link_flair_background_color": string;
    "link_flair_css_class": string;
    "link_flair_richtext": any[];
    "link_flair_text_color": string;
    "link_flair_text": any;
    "link_flair_type": string;
    "locked": boolean;
    "media_embed": {};
    "media_only": boolean;
    "media": any;
    "mod_note": any;
    "mod_reason_by": any;
    "mod_reason_title": string;
    "mod_reports": any[];
    "name": string;
    "no_follow": boolean;
    "num_comments": number;
    "num_crossposts": number;
    "num_reports": any;
    "over_18": boolean;
    "parent_whitelist_status": string;
    "permalink": string;
    "pinned": boolean;
    "post_hint": string;
    "preview": {
      images: {
        id: string;
        resolutions: {
          height: number;
          url: string;
          width: number;
        }[];
        source: {
          height: number;
          url: string;
          width: number;
        };
        variant: {};
      }[];
      enabled: boolean;
    };
    "pwls": number;
    "quarantine": boolean;
    "removal_reason": any;
    "removed_by_category": any;
    "removed_by": any;
    "report_reasons": any;
    "saved": boolean;
    "score": boolean;
    "secure_media_embed": {};
    "secure_media": any;
    "selftext_html": any;
    "selftext": string;
    "send_replies": boolean;
    "spoiler": boolean;
    "stickied": boolean;
    "subreddit_id": string;
    "subreddit_name_prefixed": string;
    "subreddit_subscribers": number;
    "subreddit_type": string;
    "subreddit": string;
    "suggested_sort": any;
    "thumbnail_height": number;
    "thumbnail_width": number;
    "thumbnail": string;
    "title": string;
    "top_awarded_type": any;
    "total_awards_received": number;
    "treatment_tags": any[];
    "ups": number;
    "upvote_ratio": number;
    "url_overridden_by_dest": string;
    "url": string;
    "user_reports": any[];
    "view_count": any;
    "visited": boolean;
    "whitelist_status": string;
    "wls": number;
  };
}

export interface SubredditResponse {
  kind?: String;
  data?: {
    after: string;
    before: string;
    dist: number;
    geo_filter: string;
    modhash: string;
    children: SubredditPostDetails[];
  };
}