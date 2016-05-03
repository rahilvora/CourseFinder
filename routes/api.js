/**
 * Created by rahilvora on 02/05/16.
 */
var express = require('express');
var router = express.Router();

router.get('/getUmedyCourses',function(req,res){
    res.sendStatus(200);
});

router.get('/getUdacityCourses',function(req,res){
    res.sendStatus(200);
});

router.get('/getCourseraCourses',function(req,res){
    res.sendStatus(200);
});

router.get('/getEdxCourses',function(req,res){
    res.sendStatus(200);
});

module.exports = router;