var request = require('request-promise');

// Sets of potential values for tag,sortBy,direction
var tags = ['','science','tech','science,tech','adssgfkjdgffhffff,science,tech'];
var sortBys = ['','id','reads','likes','popularity','asadsads'];
var directions = ['','desc','asc','asdf'];


// Test the API calls on unique combinations of (tag,sortBy,direction)
tags.forEach((tag)=>{
    sortBys.forEach((sortBy)=>{
        directions.forEach((direction)=>{
            request({
                "method": "GET",
                "uri": "http://localhost:3000/api/posts",
                "json": true,
                "qs": {
                    "tag": tag,
                    "sortBy": sortBy,
                    "direction": direction
                }
            }).then((resp) => {
                // Test the sorted result by taking the property for sorting and the specified direction (default: asc) into account.
                // Stub (I need to go to bed)
            }).catch((err)=>{
                if (tag == '' | sortBy == 'asadsads' | directions == 'asdf'){
                    console.log('Success: (' + tag + ', ' + sortBy + ', ' + direction + ')');
                }
            });
        });
    });
});