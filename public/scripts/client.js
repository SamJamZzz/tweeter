/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Create new tweet containing entire HTML structure
const createTweetElement = function(tweet) {

  // Escape function to avoid XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // HTML structure for tweet post
  let $tweet = $(`
    <article class="post">
    <header class="post-top">
      <div class="post-top-left">
        <img src=${tweet.user.avatars} class="poster-pic">
        <span>${tweet.user.name}</span>
      </div>
      <span class="poster-id">${tweet.user.handle}</span>
    </header>
    <p class="post-text">${escape(tweet.content.text)}</p>
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

// Send ajax GET request to load tweets
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
  .then((tweets) => {
    renderTweets(tweets.reverse());
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

    // Obtain tweet length
    let tweetLength = $(this).find('textarea').val().length;
    
    // Slides error message up if it is displayed
    $('.error').slideUp('slow');

    // Slides appropriate error message down if given an invalid tweet
    if (!tweetLength) {
      $('.error-message').text('No empty tweets allowed');
      $('.error').slideDown('slow');
      return false;
    }
    if (tweetLength > 140) {
      $('.error-message').text('Character limit of 140 exceeded!');
      $('.error').slideDown('slow');
      return false;
    }

    // Turns form data into query string
    const tweetData = $form.serialize();

    // Sends serialized data to server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetData
    })

    // Adds tweet to container
    .then(tweet =>  {
      $(".posts").prepend(createTweetElement(tweet));
      $(".posts").empty();
      loadTweets();
    })
    .catch(err => console.log(err));
  });
});