# Use Guide: Backend Assessment API 
---
#### System Setup
1) Using a bash terminal, navigate to the root project directory.
2) Assuming nodejs & npm are installed on your system, enter the command: 
```
npm i
```
to download the requisite dependencies for your machine.

#### "ping" Route
1)  Enter the command: 
```
node app.js
```
2) The server should now be running locally, use either a browser or Postman to "ping" the local server with a GET request at: [localhost:3000/api/ping].

3) Mission success!

#### "posts" Route
1)  Enter the command: 
```
node app.js
```
2) The server should now be running locally, use either a browser or Postman to call the local server with a GET request at: 
[localhost:3000/api/posts?tag=<>&sortBy=<>&direction=<>](localhost:3000/api/posts)
where:
    the 'tag' value is a comma separated list of tags to search posts for, 
    the 'sortBy' value is one of: _id_,_reads_,_likes_, and _popularity_,
    and the 'direction' value is either _desc_ or _asc_,

3) Mission success!

#### API Testing

1)  Enter the command: 
```
node app.js &
```
2)  Enter the command: 
```
node test.js
```

Note : I'm not very happy with the testing done here.
