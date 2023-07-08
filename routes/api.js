const app = require('express');
const api = app.Router();

const DocController=require("./Doc.controller");

api.get('/getalldoctors',DocController.getAllDoctors)
api.get('/docform',DocController.docform);
api.post('/savedocform',DocController.savedocform);
api.get('/getdocbyid/:docid',DocController.getdocbyid)
module.exports=api;