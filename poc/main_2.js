var youtudedl = (function() {
    const URL  = require('url').Url;
	var m_url = require('url'); //changed
    const api_key = 'AIzaSyC3KtXoh7UskFX6EEqyo7xSygr4mmByn9k';
    var https = require('https'); 

    function parseUrl(value) {
        /* 
        while binding with UI,take value from both html and api
        */

        web_url = new URL(value);
		m_web_url = m_url.parse(value,true);
		m_video = m_web_url.query.v
		m_list = m_web_url.query.list;
		
        //video = web_url.searchParams.get('v');
       // list = web_url.searchParams.get('list');

        /* check if the url is video or playlist or both */
        if (m_video && m_list) {
            console.log('its a video and playlist');
            parsePlaylist(m_list);
        } else if (m_video) {
            console.log('Just a video');
        } else if (m_list) {
            console.log('Its a playlist');
            parsePlaylist(m_list);
        }



    }

    function parsePlaylist(id) {
        api_url = 'https://content.googleapis.com/youtube/v3/search?type=' + id + '&q=surfing&maxResults=25&part=snippet&key=' + api_key;
        // console.log(api_url);
        // var result = getRequest(api_url);
        // console.log(result);
        var parsed = '';
        var res = https.get(api_url, function(res) {
                var body = ''; // Will contain the final response
                // Received data is a buffer.
                // Adding it to our body
                res.on('data', function(data) {
                    body += data;
                });
                // After the response is completed, parse it and log it to the console
                res.on('end', function() {
                    parsed = JSON.parse(body);
                    console.log(parsed);
                });
            })
            // If any error has occured, log error to console
            .on('error', function(e) {
                console.log("Got error: " + e.message);
            });

    }

    /*     function getRequest(api_url) {
            console.log(api_url);
            https.get(api_url, function(res) {
                    var body = ''; // Will contain the final response
                    // Received data is a buffer.
                    // Adding it to our body
                    res.on('data', function(data) {
                        body += data;
                    });
                    // After the response is completed, parse it and log it to the console
                    res.on('end', function() {
                        var parsed = JSON.parse(body);
                        // console.log(parsed);
                        // return parsed;
                    });
                })
                // If any error has occured, log error to console
                .on('error', function(e) {
                    console.log("Got error: " + e.message);
                });
        } */

    return {
        parseUrl: parseUrl
    };

})();


youtudedl.parseUrl('https://www.youtube.com/watch?v=3JluqTojuME&list=PLoYCgNOIyGAB_8_iq1cL8MVeun7cB6eNc');

/* 
AIzaSyC3KtXoh7UskFX6EEqyo7xSygr4mmByn9k
https://content.googleapis.com/youtube/v3/search?type=PLRBp0Fe2GpgmsW46rJyudVFlY6IYjFBIK&q=surfing&maxResults=25&part=snippet&key=AIzaSyC3KtXoh7UskFX6EEqyo7xSygr4mmByn9k
*/
