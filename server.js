var express = require('express'),
path = require("path"),
application_root = __dirname,
cases = require('./routes/cases');
 
var app = express();
 
app.configure(function () {
app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
app.use(express.bodyParser());
app.use(express.static(path.join(application_root, "public")));
});
 
app.get('/cases', cases.findAll);
app.get('/cases/:id', cases.findById);
app.post('/cases', cases.addWine);
app.put('/cases/:id', cases.updateWine);
app.delete('/cases/:id', cases.deleteWine);
 
app.listen(3000);
console.log('Listening on port 3000...');
