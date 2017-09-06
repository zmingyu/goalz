// dynamic input widths
function resizeInput() {
    $(this).attr('size', $(this).val().length+1);
}

$('input')
    // event handler
    .keyup(resizeInput)
    // resize on page load
    .each(resizeInput);

// set min date
$('[type="date"]').prop('min', function(){
    return new Date().toJSON().split('T')[0];
});


// set custom unit 
$('#unit').blur(function() {
  var unit = $('#unit').val();
  $('#custom').replaceWith('<span id="custom">' + unit + '</span>');
});

// add default date
$('input[type=date]').on('blur',function(){
  if($(this).val().trim().length == 0){
    $(this).val("2018-01-01");
  }
});

// add default value 0
$('input').on('blur',function(){
  if($(this).val().trim().length == 0){
    $(this).val(0);
  }
});


// submit form
  $('form').submit(function(event) {
    var goal = $('#goal').val();
    var unit = $('#unit').val();
    var today = new Date();
    var deadline = $('#dl').val();
    var progress = $('#progress').val();
    var breaks = $('#breaks').val();
    
    var diff =  Math.floor(( Date.parse(deadline) - Date.parse(today) ) / 86400000);
    var goalzDay = (goal - progress) / (diff - breaks);
    var goalzWeek  = goalzDay * 7;    
    var goalzMonth  = goalzDay * 30.42;
    $('#remainder').replaceWith('<div id="remainder">With ' + (diff - breaks) + ' days left and ' + (goal - progress) + ' ' + unit + ' to go, my goalz are:</div>');
    $('#day').replaceWith('<div id="day"><span class="big">' + goalzDay.toFixed(2) + '</span><br>'+unit+' per day</div>');
    $('#week').replaceWith('<div id="week"><span class="big">' + goalzWeek.toFixed(1) + '</span><br>'+unit+' per week</div>');
    $('#month').replaceWith('<div id="month"><span class="big">' + goalzMonth.toFixed(0) + '</span><br>'+unit+' per month</div>');
    event.preventDefault();
    
    
// scroller
    $('html, body').animate({
        scrollTop: $("#results").offset().top
    }, 1000);

});