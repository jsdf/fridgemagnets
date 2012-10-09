$(function() {
  var client = new Faye.Client('/faye');

  client.subscribe('/magnets', function(magnets) {
    console.log(magnets);
    $.each(magnets, function(id, magnet){
      $('#'+id).css(magnet.position);
    })
  });

  $(".magnet")
    .draggable({ revert: "valid", revertDuration: 100})
    .bind('dragstop', function(event, ui) {
      var magnets = {}
      magnets[ui.helper.attr('id')] = { position: ui.position };
      client.publish('/magnets', magnets);
    })
    .droppable()
});