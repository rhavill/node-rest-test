var mongo = require('mongodb');
 
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('casedb', server);
 
db.open(function(err, db) {
if(!err) {
console.log("Connected to 'casedb' database");
db.collection('cases', {strict:true}, function(err, collection) {
if (err) {
console.log("The 'cases' collection doesn't exist. Creating it with sample data...");
populateDB();
}
});
}
});
 
exports.findById = function(req, res) {
var id = req.params.id;
console.log('Retrieving case: ' + id);
db.collection('cases', function(err, collection) {
collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
res.send(item);
});
});
};
 
exports.findAll = function(req, res) {
db.collection('cases', function(err, collection) {
collection.find().toArray(function(err, items) {
res.send(items);
});
});
};
 
exports.addWine = function(req, res) {
var cases = req.body;
console.log('Adding case: ' + JSON.stringify(cases));
db.collection('cases', function(err, collection) {
collection.insert(cases, {safe:true}, function(err, result) {
if (err) {
res.send({'error':'An error has occurred'});
} else {
console.log('Success: ' + JSON.stringify(result[0]));
res.send(result[0]);
}
});
});
}
 
exports.updateWine = function(req, res) {
var id = req.params.id;
var cases = req.body;
console.log('Updating case: ' + id);
console.log(JSON.stringify(cases));
db.collection('cases', function(err, collection) {
collection.update({'_id':new BSON.ObjectID(id)}, cases, {safe:true}, function(err, result) {
if (err) {
console.log('Error updating cases: ' + err);
res.send({'error':'An error has occurred'});
} else {
console.log('' + result + ' document(s) updated');
res.send(cases);
}
});
});
}
 
exports.deleteWine = function(req, res) {
var id = req.params.id;
console.log('Deleting case: ' + id);
db.collection('cases', function(err, collection) {
collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
if (err) {
res.send({'error':'An error has occurred - ' + err});
} else {
console.log('' + result + ' document(s) deleted');
res.send(req.body);
}
});
});
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
var cases = [
    {"name": "Anders, Ann",
     "id": 1,
     "gender": "F",
     "done": false,
     "hasConsent": false,
     "room": "UF05",
     "time": "8:00",
     "pre": "IP",
     "roomNumber": "8241A",
     "post": "82SI",
     "mrn": "0203-1465",
     "procedure": "STEALTH CRANI WITH VP SHUNT REVISION",
     "duration": 90,
     "surgeon": "Davis/NOT ASSIGNED",
     "anesthesia": "",
     "type": "GEN",
     "caseNumber": 539923,
     "age": "20Y",
     "consentGeneral": false,
     "consentMac": false,
     "consentConsciousSedation": false,
     "consentRegional": false,
     "consentSpinal": false,
     "consentEpidural": false,
     "noConsentReason": " ",
     "noConsentNotes": ""
     },
    {"name": "Didley, Bo",
     "id": 2,
     "gender": "M",
     "done": false,
     "hasConsent": false,
     "room": "UA12",
     "time": "15:15",
     "pre": "IP",
     "roomNumber": "4244",
     "post": "PACU",
     "mrn": "0202-2100",
     "procedure": "G TUBE PLACEMENT",
     "duration": 45,
     "surgeon": "Stevens/Smith",
     "anesthesia": "Walters/Schmidt",
     "type": "GEN",
     "caseNumber": 5234905,
     "age": "72Y",
     "consentGeneral": false,
     "consentMac": false,
     "consentConsciousSedation": false,
     "consentRegional": false,
     "consentSpinal": false,
     "consentEpidural": false,
     "noConsentReason": " ",
     "noConsentNotes": ""
     },
    {"name": "Simpson, Homer",
     "id": 3,
     "gender": "M",
     "done": false,
     "hasConsent": false,
     "room": "UF07",
     "time": "8:00",
     "pre": "IP",
     "roomNumber": "UA6210",
     "post": "PACU",
     "mrn": "0170-8455",
     "procedure": "RIGHT FEMUR FRACTURE",
     "duration": 120,
     "surgeon": "Heisenberg/Balko",
     "anesthesia": "Payton/Robinson",
     "type": "BL/RM",
     "caseNumber": 466522,
     "age": "53Y",
     "consentGeneral": false,
     "consentMac": false,
     "consentConsciousSedation": false,
     "consentRegional": false,
     "consentSpinal": false,
     "consentEpidural": false,
     "noConsentReason": " ",
     "noConsentNotes": ""

     },
    {"name": "Smith, Judy",
     "id": 4,
     "gender": "F",
     "done": false,
     "hasConsent": false,
     "room": "GIST01",
     "time": "11:00",
     "pre": "OP",
     "roomNumber": "",
     "post": "PACU",
     "mrn": "0313-2109",
     "procedure": "EGD",
     "duration": 60,
     "surgeon": "Lasko/Jabir",
     "anesthesia": "Langley/Roberts",
     "type": "MAC",
     "caseNumber": 913456,
     "age": "2MO",
     "consentGeneral": false,
     "consentMac": false,
     "consentConsciousSedation": false,
     "consentRegional": false,
     "consentSpinal": false,
     "consentEpidural": false,
     "noConsentReason": " ",
     "noConsentNotes": ""
     }

];
 
db.collection('cases', function(err, collection) {
collection.insert(cases, {safe:true}, function(err, result) {});
});
 
};
