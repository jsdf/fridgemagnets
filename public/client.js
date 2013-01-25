$(function() {

  var alphabet = ['e', 'e', 'e', ':', ')', 'a', 'a', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  $.each(alphabet, function(index, value) {
    var letter = $('<span></span>')
      .text(value)
      .addClass('magnet')
      .attr('id','magnet'+index)
      .css('color', tinycolor({ h: Math.random()*360, s: 90, l: 60 }).toHexString())
      // .css('color', $.husl.toHex(Math.random()*360, 100, 90))
      .appendTo(document.body);
  })

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
    .droppable();
});
