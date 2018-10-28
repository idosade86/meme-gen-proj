function sendInfo() {
    // var userEmail = $(".user-email").val();
    var userSubject = $('.user-subject').val();
    var userText = $('.user-text').val();

    $('.user-email').val('');
    $('.user-type').val('');
    $('.user-text').val('');

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=idokestin@gmail.com&su=${userSubject}&body=${userText}`, '_blank');
  

}