(function(){
    'use strict';

    const express = require('express');
    const app = express();
    const port = process.env.PORT || 8000;

    app.use(express.static('.'))
        .listen(port, function (err){
            if(err){
                return console.log(err, 'there was an error')
            }

            console.log('app is running on:', port);
        })

})();





