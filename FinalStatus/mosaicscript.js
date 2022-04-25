$( "#gallery .item" ).hover(
  function() {
    $( '#gallery' ).addClass( "hover" );
    $( this ).addClass( "hover" );
  }, function() {
    $( this ).removeClass( "hover" );
    $( '#gallery' ).removeClass( "hover" );
  }
);
