/**
 * Created by rahilvora on 02/05/16.
 */
var express = require('express'),
    request = require('request'),
    router = express.Router(),
    cloudant,
    dbname;

var Cloundant = require('cloudant');
function connectionToDatabase(){
    var username = "52fbc18e-7f79-4a9c-9447-19cfa2cf0c81-bluemix";
    var password = "c8380cdf021f3ba3f98b906db43c8d40468d816c68c0687d9797f34b9f3b9ad6";
    cloudant = Cloundant({account:username, password:password});

    cloudant.db.list(function(err,allDbs){
        console.log("All the databases : %s", allDbs.join(', '));
    });

    dbname = cloudant.db.use('courses');
}
connectionToDatabase();
var id ;
var rev;
var allCourses = [];

//Udemy
router.get('/getUdemyCourses',function(req,res){
    var query = {
        "selector": {
            "_id": {
                "$gt": 0
            }
        },
        "fields": [
            "courses"
        ],
        "sort": [
            {
                "_id": "asc"
            }
        ]
    }
    dbname.find(query,function(err,result){
       if(!err){
           res.send(result);
       }
    });
});

router.get('/udemyAPICall',function(req,res){

    var catogories = {
                        "technology":{
                            "mobile-development":["mobile-apps"],
                            "web-development":["web-development","javascript"],
                            "big-data":["databases","big-data"]
                        },
                        "business":{
                            "finance":["finance"],
                            "accounting":["accounting"]
                        }
                    };
    generatedata(catogories,res);
});

function generatedata(catogories, res){
    var dataobject = [];
    var count = 0;
    for(var catogory in catogories){
        for(var subcatogory in catogories[catogory]){
            for(var keyword in catogories[catogory][subcatogory]){
                requestUdemyAPI(catogories[catogory][subcatogory][keyword],catogory,subcatogory,function(body){
                    count++;
                    dataobject.push(body);
                    if(count>=7){
                        storeUdemydata(dataobject);
                        console.log(dataobject);
                        res.send(200);
                    }
                });

            }
        }

    }
}

function requestUdemyAPI(params,category,subcategory,callback){
    var username =  "z8xTpuVXVnH0HkEnRZVKdKr9wSMYNaE7DPREsD6x";
    var password =  "0dmD7sTbZ70bbSzrmA8XsHdSKa5HoSAvFFfINzYGrfR9bPkTf5WDn8e62MnuNi0sW9CA" +
                    "IjlAcbPigNDp62jJ8Ws1BBHbDVIZy53TdEUYTxg9TfqeoXYxQdwGX3T7UzKu";

    var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
    request({url :"https://www.udemy.com/api-2.0/courses/?search="+params,headers:{"Authorization":auth}},function(err,res,body){
        body = JSON.parse(body).results;
        body.push({"category":category,"subcategory":subcategory});
        callback(body);
    });
}
function storeUdemydata(data){
    for(var obj in data){
        var object = data[obj];
        var len = object.length -1;
        var commonCourseItem = {
            category : object[len].category,
            subcategory : object[len].subcategory,
            website: 'udemy'
        };
        for(var i=0; i < len; i++) {
            var courseItem = Object.assign({}, commonCourseItem);
            courseItem.name = object[i].title;
            allCourses.push(courseItem);
        }

    }
}

//Udacity
router.get('/getUdacityCourses',function(req,res){
    var query = {
        "selector": {
            "_id": {
                "$gt": 0
            }
        },
        "fields": [
            "courses"
        ],
        "sort": [
            {
                "_id": "asc"
            }
        ]
    };
    dbname.find(query,function(err,result){
        if(!err){
            res.send(result);
        }
    });
});

router.get('/udacityAPICall',function(req,res){
    request({url:"https://www.udacity.com/public-api/v0/courses"}, function(err,result,body){
        generatedataUdacity(JSON.parse(body));
        res.send(200);
    });

});
function generatedataUdacity(body){
    body = body.courses;
    for(var object in body){
        for(var track in body[object].tracks){
            if(body[object].tracks == "Android"){
                var courseItem = {};
                courseItem.name = body[object].title;
                courseItem.category = "Technology";
                courseItem.subcategory = "mobile-development";
                courseItem.website = "udacity"
                allCourses.push(courseItem);
            }
            else if(body[object].tracks == "Web Development"){
                var courseItem = {};
                courseItem.name = body[object].title;
                courseItem.category = "Technology";
                courseItem.subcategory = "web-development";
                courseItem.website = "udacity"
                allCourses.push(courseItem);
            }
            else if(body[object].tracks == "iOS"){
                var courseItem = {};
                courseItem.name = body[object].title;
                courseItem.category = "Technology";
                courseItem.subcategory = "mobile-development";
                courseItem.website = "udacity";
                allCourses.push(courseItem);
            }
            else if(body[object].tracks == "Data Science"){
                var courseItem = {};
                courseItem.name = body[object].title;
                courseItem.category = "Technology";
                courseItem.subcategory = "big-data";
                courseItem.website = "udacity";
                allCourses.push(courseItem);
            }
        }
    }
    console.log(allCourses);
}
//Coursera
router.get('/getCourseraCourses',function(req,res){
    var query = {
        "selector": {
            "_id": {
                "$gt": 0
            }
        },
        "fields": [
            "courses"
        ],
        "sort": [
            {
                "_id": "asc"
            }
        ]
    }
    dbname.find(query,function(err,result){
        if(!err){
            res.send(result);
        }
    });
    //res.sendStatus(200);
});

router.get('/courseraAPICall',function(req,res){
    var catogories = {
        "technology":{
            "mobile-development":"https://api.coursera.org/api/courses.v1?q=search&query=ios-android&primaryLanguages=en",
            "web-development":"https://api.coursera.org/api/courses.v1?q=search&query=web&primaryLanguages=en&limit=30",
            "big-data":"https://api.coursera.org/api/courses.v1?q=search&query=database&primaryLanguages=en&limit=30"
        },
        "business":{
            "finance":"https://api.coursera.org/api/courses.v1?q=search&query=finance&primaryLanguages=en&limit=30",
            "accounting":"https://api.coursera.org/api/courses.v1?q=search&query=accounting&primaryLanguages=en&limit=30",
        }
    };
    generatedataCoursera(catogories,res);

});
function generatedataCoursera(catogories,res){
    var count = 0;
    var mainArray = [];
    for (var catogory in catogories){
        for(var subcatogory in catogories[catogory]){
            requestCourseraAPI(catogories[catogory][subcatogory],catogory,subcatogory,function(result){
                count++;
                mainArray.push(result);
                if(count>=5){
                    storeCourseraData(mainArray);
                    res.send(200);
                }
            });
        }
    }
}

function requestCourseraAPI(params,category,subcategory,callback){
    request({url:params},function(err, response, body){
        body = JSON.parse(body);
        body.category = category;
        body.subcategory = subcategory;
        callback(body);
    });
}

function storeCourseraData(data){
    for(var object in data){
        var obj = data[object];
        var elements = obj.elements;
        var commonCourseItem = {
            category:obj.category,
            subcategory:obj.subcategory,
            website:"coursera"
        };
        for(var course in elements){
            var courseItem = Object.assign({}, commonCourseItem);
            courseItem.name = elements[course].name;
            allCourses.push(courseItem);
        }
    }
}
//Edx Requests
router.get('/getEdxCourses',function(req,res){
    res.sendStatus(200);
});

router.get('/edxAPICall',function(req,res){
    console.log("Edx API called");
    res.send(200);
});

router.get('/refreshDatabase',function(req,res){

    dbname.insert({"courses":allCourses}, function (err,result) {
       if(err){
           throw err;
       }
        else {
           res.send(200);
       }
    });
});

router.get('/getTypeFormData',function(req,res){
        requestTypeFormApi(res);
        //res.send(200);
});

function requestTypeFormApi(res){
    request({url:"https://api.typeform.com/v1/form/E40piT?key=4286da471351efdfb66c7db9b7058b5b3658a591"},function(err,response,body){
        var responses = JSON.parse(body).responses;
        var lastresponse = {};
        var count = 0;
        var length = responses.length;
        for( var response in responses){
            count++;
            if(responses[response].completed!=0){
                lastresponse.catogory = responses[response].answers.list_22015239_choice;
                lastresponse.subcatogorytech = responses[response].answers.list_22015281_choice;
                lastresponse.subcatogorybus = responses[response].answers.list_22015289_choice;
            }
        }
        if(count>=length){
            dbcall(res,lastresponse)
        }
    })
}

router.get("/getData", function(req,res){
    var query = {
        "selector": {
            "_id": {
                "$gt": 0
            }
        },
        "fields": [
            "courses"
        ],
        "sort": [
            {
                "_id": "asc"
            }
        ]
    }
    dbname.find(query,function(err,result){
        if(!err){
            result.response = lastresponse;
            res.send(result);
        }
    });
});
function dbcall(res, lastresponse){
    var query = {
        "selector": {
            "_id": {
                "$gt": 0
            }
        },
        "fields": [
            "courses"
        ],
        "sort": [
            {
                "_id": "asc"
            }
        ]
    }
    dbname.find(query,function(err,result){
        if(!err){
            result.response = lastresponse;
            res.send(result);
        }
    });
}
module.exports = router;