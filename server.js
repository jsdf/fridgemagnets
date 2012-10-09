var connect = require('connect')
  , http = require('http')
  , faye = require('faye')

var server = connect()
    .use(connect.static('public'))
    .listen(3000)

var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});
bayeux.attach(server);

var fayeclient = bayeux.getClient();

var statecache = {};

fayeclient.subscribe('/magnets', function(magnets){
  for (var id in magnets){
    statecache[id] = magnets[id];
  }
});

bayeux.addExtension({
  incoming: function(message, callback){
    if (message.channel == '/meta/subscribe') {
      setTimeout(function(){
        fayeclient.publish('/magnets', statecache);
      });
    }
    callback(message);
  }
});
