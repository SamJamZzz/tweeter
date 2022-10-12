/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      <p class="time-since">${timeago.format(tweet.created_at)}</p>
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
};

const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
  .then((tweets) => {
    renderTweets(tweets);
  })
  .catch((err) => {
    console.log(err);
  })
};

$(document).ready(function() {
  loadTweets();

  // Listens to form submission for new tweet
  const $form = $('.submit-tweet');
  $form.on('submit', function(event) {
    event.preventDefault();

    // Turns form data into query string
    const tweetData = $form.serialize();

    // Sends serialized data to server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetData
    });
  });
});