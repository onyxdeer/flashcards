    var wow = new WOW({
        mobile:       false,       // default
      }
    )
    wow.init();
$(window).load(function() {
    $("#preloader").fadeOut("slow");
});

$(document).ready(function(){


    $('#countdown_dashboard').countDown({
        targetDate: {
            'day':      20,
            'month':    4,
            'year':     2017,
            'hour':     18,
            'min':      00,
            'sec':      01,
        },
        omitWeeks: true
    });

})