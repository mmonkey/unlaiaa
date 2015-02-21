/* Function that updates the value field of text inputs */
function updateValue(input, text) {
  input.val(text);

  if(input.val() === null) {
    input.val(text);
  }
  input.focus(function() {
    if(input.val() === text) {
      input.val("");
    }
  });
  input.blur(function() {
    if(input.val() === null || input.val() === "") {
      input.val(text);
    }
  });
}

// Override :contains - make it case-insensitive
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
  return function( elem ) {
    return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
  };
});

$(document).ready(function() {

  //=========================================
  //  NAVIGATION
  //=========================================
  // Nav toggle
  $('.nav-toggle').click(function() {
    $('nav.dropdown').slideToggle(300);

    if( $(this).hasClass('fa-bars') ) {
      $(this).removeClass('fa-bars').addClass('fa-close');
    } else {
      $(this).removeClass('fa-close').addClass('fa-bars');
    }
  });

  //=========================================
  //  OUR TEAM
  //=========================================
  var teamFilter = '';

  function filterTeams(team) {

    if(team.toUpperCase() !== 'ALL MEMBERS') {
      updateValue( $('.team-member-filter'), team);

      $('.member-title').each(function() {
        if($(this).text().toUpperCase().indexOf(team) > -1) {
          $(this).closest('.member-group').show();
        } else {
          $(this).closest('.member-group').hide();
        }
      });
    } else {
      updateValue($('.team-member-filter'), 'Search...');
      $('.member-group').show();
    }
    teamFilter = team.toUpperCase();
  }

  // Keep team member photos height and width in sync
  $('.team-member-photo').height( $('.team-member-photo').width() );
  $(window).resize(function() {
    $('.team-member-photo').height( $('.team-member-photo').width() );
  });

  // Replace .member-photo with image source
  $('.member-photo').each(function() {
    var src = $(this).find('img').attr('src');
    $(this).css('background', 'url(' + src + ') no-repeat center center');
  });

  // Load team filter from hash
  var hash = window.location.hash.replace("#", "");
  hash = hash.toUpperCase();

  switch(hash) {
    case 'OFFICERS':
    case 'DBF':
    case 'ROCKSAT':
      filterTeams(hash);
      break;
    default:
      filterTeams('ALL MEMBERS');
      break;
  }

  // Toggle team filter list
  $('.team-filter-list-toggle').click(function() {
    $('.team-filter-list').slideToggle();
  });

  // Team filter list
  $('.team-filter-list li').click(function() {
    var val = $(this).text().toUpperCase();
    $('.team-filter-list').slideToggle();

    filterTeams(val);
  });

  // Member filter input
  $('input.team-member-filter').keyup(function() {
    var val = $(this).val();
    if( val ) {
      $('.team-member-info .name:not(:contains("' + val + '"))').closest('.team-member').parent().hide();
    } else {
      $('.team-member').parent().show();
    }
  });

  // Clear on focus after team filtered
  $('input.team-member-filter').focus(function() {
    var val = $(this).val();
    if( $('.team-filter-list:contains("' + val + '")') ) {
      $(this).val("");
      $('.team-member').parent().show();
    }
});

});