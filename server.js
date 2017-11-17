(function(){
    'use strict';

    const express = require('express');
    const app = express();
    const port = process.env.PORT || 8000;
    var bodyParser = require('body-parser');



    const http = require('http');
    var url = require('url');
    var fs = require('fs');

    app.use(express.static('.'))
        .listen(port, function (err){
            if(err){
                return console.log(err, 'there was an error')
            }

            console.log('app is running on:', port);
        })


    // var apiKey = '6bd81b03a64f7ae2cb9240d3271279aa';
    // var city;
    //
    // http.createServer(function(req, res){
    //     url = url.parse(req.url, true);
    //     city = url.query.city;
    //     getData(city);
    // }).listen(port);
    //
    // function getData(city) {
    //     var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&apikey=' + apiKey;
    //     http.get(apiUrl, function(req, res){
    //         var data = '';
    //         req.on('data', function(chunk){
    //             data += chunk;
    //         });
    //         req.on('end', function(){
    //             console.log(JSON.parse(data))
    //         })
    //     })
    //         .on('error', function(err){
    //             console.log('There was an error ' + err.message);
    //         })
    // }




        //
        // var apiKey = '6bd81b03a64f7ae2cb9240d3271279aa';

        // http.get(apiUrl, function(req, res){
        //     console.log(req)
        //     var data = '';
        //     req.on('data', function(chunk){
        //         data += chunk;
        //     });
        //
        //     req.on('end', function(){
        //         console.log(JSON.parse(data))
        //     })
        //
        // })



})();





