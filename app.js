var fs = require('fs') ,express = require('express'),
app = express();

port = 8080;

app.use('/', express.static(__dirname));

app.get('/', function(req, res){
    fs.readFile(__dirname + 'index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.listen(port, function(){
    console.log('Server listening on %d', port);
});