$(document).ready(function() {
  $(".new-tweet").on("keyup", "textarea", function() {
    let length = $(this).val().length;
    let $counter = $(this).siblings("div.tweetcontent").children(".counter");
    let countLength = 140 - length;
    $counter.val(countLength);

    if (countLength >= 0) {
      $counter.css({ 'color': '#545149'});
    }
    if (countLength < 0) {
      $counter.css({ 'color': 'red'});
    }
  })
});