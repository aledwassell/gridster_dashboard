(function(){
    'use strict';

    const express = require('express');
    const app = express();
    const port = process.env.PORT || 8000;
    const http = require('http');

    app.use(express.static('.'))
        .listen(port, function (err){
            if(err){
                return console.log(err, 'there was an error')
            }

            console.log('app is running on:', port);
        })


        var apiKey = '6bd81b03a64f7ae2cb9240d3271279aa';
        var apiUrl = 'http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1';
        http.get(apiUrl, function(res){
            var data = '';
            res.on('data', function(chunk){
                data += chunk;
            });

            res.on('end', function(){
                console.log(JSON.parse(data))
            })

        })
            .on('error', function(err){
                console.log('There was an error ' + err.message);
            })



})();





