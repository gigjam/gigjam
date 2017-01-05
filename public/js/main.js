$(document).ready(function() {

  $('#project_type').on('change', function() {
    $('#sum_estimate').text(calculateEstimate());
  });

  $('#hours').change(function() {
    $('#sum_estimate').text(calculateEstimate());
  }).keyup(function(){
        $(this).blur();
        $(this).focus();
  });

  $('#byhour_or_new').on('change', function() {
    if (this.value === 'Nytt') {
      $('#looking_for_form_group').addClass('hide')
      $('#hours_form_group').addClass('hide')
    } else {
      $('#looking_for_form_group').removeClass('hide')
      $('#hours_form_group').removeClass('hide')
    }
  });

});

const PROJECTTYPES_COST = {
  STATICSITE: 600,
  WEBAPP: 800,
  ANDROID: 1000,
  IOS: 1000
}

const PROJECTTYPES_HOURS = {
  STATICSITE: 20,
  WEBAPP: 150,
  ANDROID: 300,
  IOS: 300
}

function calculateEstimate() {

  var sum = 0;

  var selected_project_type = $('#estimate_form #project_type li.selected');
  var hoursInput = $('input#hours');
  var isByHour = !($('#looking_for_form_group').hasClass('hide'));
  for (var i = 0, len = selected_project_type.length; i < len; i++) {
    var hourCost  = getTypeCost($(selected_project_type.get(i)));
    var hours = 0;
    if (isByHour) {
      hours = parseInt(hoursInput.val()) || 0;
    } else {
      hours = getTypeHours($(selected_project_type.get(i)));
    }

    sum += (hourCost*hours);

  }

  return sum;

}

function getTypeCost(li) {
    switch(li.text()){
      case 'Statisk webbsida':
        return PROJECTTYPES_COST.STATICSITE;
      case 'Web app':
        return PROJECTTYPES_COST.WEBAPP;
      case 'iOS':
        return PROJECTTYPES_COST.IOS;
      case 'Android': 
        return PROJECTTYPES_COST.ANDROID;
    }
}

function getTypeHours(li) {
    switch(li.text()){
      case 'Statisk webbsida':
        return PROJECTTYPES_HOURS.STATICSITE;
      case 'Web app':
        return PROJECTTYPES_HOURS.WEBAPP;
      case 'iOS':
        return PROJECTTYPES_HOURS.IOS;
      case 'Android': 
        return PROJECTTYPES_HOURS.ANDROID;
    }
}