// Apply animations on page load
$(document).ready(function() {
    $('.animated').css('opacity', 0).each(function() {
        $(this).animate({ opacity: 1 }, 800);
    });
});
