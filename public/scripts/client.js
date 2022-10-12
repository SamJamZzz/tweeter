/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// Create new tweet containing entire HTML structure
const createTweetElement = function(tweet) {
  let $tweet = $(`
    <article class="post">
    <header class="post-top">
      <div class="post-top-left">
        <img src=${tweet.user.avatars} class="poster-pic">
        <span>${tweet.user.name}</span>
      </div>
      <span class="poster-id">${tweet.user.handle}</span>
    </header>
    <p class="post-text">${tweet.content.text}</p>
    <hr class="post-divider">
    <footer class="post-bottom">
      <p class="time-since">${tweet.created_at} days ago</p>
      <div class="post-bottom-right">
        <form class="post-buttons" action="">
          <button class="button"><i class="fa-solid fa-flag"></i></button>
          <button class="button"><i class="fa-solid fa-retweet"></i></button>
          <button class="button"><i class="fa-solid fa-heart"></i></button>
        </form>
      </div>
    </footer>
    </article>
  `);
  return $tweet;
};

// Appends tweet object to the HTML tweets container
const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    $(".posts").append(createTweetElement(tweet));
  });
}

$(document).ready(function() {
  renderTweets(data);
});