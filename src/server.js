var express = require('express');
const fs = require('fs');
const readline = require('readline');
var exec = require('child_process').exec;
var bodyParser = require('body-parser');
var app = express();

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/servertest', function (req, res) {
  res.send('Hello World!');
  readFile();
});

app.get('/api/spice', function (req, res) {
  console.log('GET');
});

app.post('/api/spice', function (req, res) {
  console.log(Date.now(), 'more', req.body);

  console.log(req.body);
  var temp = JSON.stringify(req.body);
  temp = temp.replace(/z/g, "\n");
  temp = temp.replace(/":"/g, "=");
  fs.writeFile('./test.txt', temp, function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });


  var cmd = 'ngspice -b -o out.txt buck.txt';

  exec(cmd, function (error, stdout, stderr) {

  });
  var readStream = fs.createReadStream('./coords.txt', 'utf8');
  var remaining = '';
  var count = 0;
  var rotate = 0;
  var Vc = [];
  var Vl = [];
  var Ic = [];
  var Il = [];
  var Tus = [];

  readStream.on('data', function (chunk) {
    remaining += chunk;
    var index = remaining.indexOf('\n');
    var last = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      helkp = line.slice(line.indexOf('\t')+1,line.indexOf('e')-1);

      last = index + 1;
      if(count >= 13){
        if (rotate%6 == 0) {
          Tus.push(helkp);
        }
        if (rotate%6 == 1) {
          Vc.push(helkp);
        }
        if (rotate%6 == 2) {
          Vl.push(helkp);
        }
        if (rotate%6 == 3) {
          Ic.push(helkp);
        }
        if (rotate%6 == 4) {
          Il.push(helkp);
        }
        rotate++;
      }
      index = remaining.indexOf('\n', last);
      count++;
    }
    remaining = remaining.substring(last);
  }).on('end', function() {
    data = {
      Vc: Vc,
      Vl: Vl,
      Ic: Ic,
      Il: Il,
      Tus: Tus
    };
    cords = JSON.stringify(data);
    //send cords if you want to display string of everything
    res.send(data);
  });

  res.end;
});


app.listen(5260, function () {
  console.log('Example app listening on port 5260!');
});

function readFile() {
  fs.readFile('./typings.json', (err, data) => {
    if (err) throw err;
    console.log("Read worked");
    console.log(data);
  });
}