var express = require('express'),
cases = require('./routes/cases');
 
var app = express();
 
app.configure(function () {
app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
app.use(express.bodyParser());
});
 
app.get('/cases', cases.findAll);
app.get('/cases/:id', cases.findById);
app.post('/cases', cases.addWine);
app.put('/cases/:id', cases.updateWine);
app.delete('/cases/:id', cases.deleteWine);
 
app.listen(3000);
console.log('Listening on port 3000...');
