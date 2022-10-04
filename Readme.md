# FrontEnd Test:

## Question:
1. [Done] Use the Reddit API to query r/aww and implement infinite scrolling with a list of results.
2. [Done] On initial page load, the app should automatically retrieve the first 25 records.
3. [MISSING] When you scroll to the end of the list, load 25 more records.
4. [Done] Each list item should display the title, thumbnail if available, and the original subreddit name. Clicking the title should navigate to the original reddit post.
5. [NEW] Choose whichever sorting you'd like (top, new, etc).
6. [USED] You must use at least two different components (ex: reddit-list-item, reddit-list-container.)
7. [Angular] You can use any framework you prefer, do not use any other external libraries or plugins to create the infinite scroll logic or any other interactive mechanics
8. [DONE] include installation and running instructions, host the solution on a git-supported platform (github, bitbucket etc)

## What Has Been Not Done:
Infinite scroll not added due to problem getting it to work.

## Instructions To Run.

Inside of the FrontEndTest folder which the below shell takes you to, modify the environment/environment.ts 
and environment/environment.prod.ts  appSecret needs to be filled. It has been kept out as required to save 
the account from others modifying/stealing everything.

```sh
cd FrontEndTest
echo "Run in local by below command"
ng serve 
echo "Build for non prod by below command"
ng build
echo "Build for prod by below command"
ng build -c production
```

Already build dist is in dist/front-end-test folder. It can run directly from any server which can host it.

```sh
cd dist/front-end-test
echo "Choose any one of the method as required:"
echo "Http Server if already installed using npm i -g http-server"
http-server
echo "Lite Server if already installed using npm i -g lite-server"
lite-server
echo "Or put in tomcat/weblogic webapp directory"
```
