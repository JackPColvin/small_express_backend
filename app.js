// Load dependencies
var express = require("express");
var app = express();
var request = require('request-promise');
var md5 = require('md5');

var config = require("./config.json");
const url = config.development.url;

// Serve the application on port 3000
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/api/ping", (req,res,next) => {
    // Respond with statically with string array
    var response_body = {
        success: true
    };
    res.status(200).json(response_body);
});

app.get("/api/posts", (req,res,next) => {
    var sortBy = null;
    var direction = null; 

    // Check the requests "tag" query param, reject request if parameter isn't filled.
    // (required)
    if(req.query.tag == undefined){
        var response_body = {
            error:"Must specify tags for a response"
        };
        res.status(400).json(response_body);
    } 
    // 
    // (optional)
    if(req.query.sortBy != undefined){
        var temp = req.query.sortBy;
        if(temp == "id"|
           temp == "reads"|
           temp == "likes"|
           temp == "popularity")
        {
            sortBy = temp;
        }else{
            var response_body = {
                error: "Invalid sortBy param"
            };
            res.status(400).json(response_body);
            return;
        }
    }
    // 
    // (optional)
    if(req.query.direction != undefined){
        var temp = req.query.direction;
        if (temp == "desc" |
            temp == "asc") {
            direction = temp;
        }else {
            var response_body = {
                error: "Invalid direction param"
            };
            res.status(400).json(response_body);
            return;
        }
    }
    const tags = req.query.tag.split(",");
    
    var body = new Object();
    body["posts"] = new Object();

    // Make an API request for each tag in the "tag" query string
    tags.forEach((tag)=>{
        request({
            "method": "GET",
            "uri": url,
            "json": true,
            "qs": {
                "tag": tag
            }
        }).then((resp) => {
            resp.posts.forEach((post)=>{
                // Use the post id's to differentiate between posts, use a hashing approach to compute the intersection efficiently.
                if(body.posts[post.id] == undefined){
                    body.posts[post.id] = post;
                }
            });

        });
    });
    
    // This is terrible!!!
    // Its a hacky solution to fix the response firing before the requests for individual tags are processed.
    setTimeout(() => { 
        var sortable = [];
        for (var post in body.posts) {
            sortable.push(body.posts[post]);
        }
        sortable.sort((a, b) => {
            if (direction == "desc") return b[sortBy] - a[sortBy];
            return a[sortBy] - b[sortBy];
        });
        res.status(200).send(JSON.stringify(sortable,null,4));
    }, 1000);
    
});

