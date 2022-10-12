$(document).ready(function() {
  $(".new-tweet").on("keyup", "textarea", function() {
    let length = $(this).val().length; // Measures length of text within textarea element
    let $counter = $(this).siblings("div.tweetcontent").children(".counter"); // Target the character count
    let countLength = 140 - length;
    $counter.val(countLength); // Set and update character count as text is entered

    // If character limit is exceeded, character counter is coloured red
    if (countLength >= 0) {
      $counter.css({ 'color': '#545149'});
    }
    if (countLength < 0) {
      $counter.css({ 'color': 'red'});
    }
  })
});