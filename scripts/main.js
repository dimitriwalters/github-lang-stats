(function() {
    function getLang(user, page, repos) {
        $.ajax({
            type: 'GET',
            url: 'https://api.github.com/users/' + user + '/repos?page=' + page,
            async: false,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(res) {
                if (res.data.message === 'Not Found') {
                    alert('Invalid username');
                }
                else {
                    repos = repos.concat(res.data);
                    if (res.data.length === 30) {
                        page++;
                        getLang(user, page, repos);
                    } else {
                        getLangCount(repos);
                    }
                }
            },
            error: function(e) {
               alert(e.message);
            }
        });
    }

    function getLangCount(repos) {
        var langMap = {};

        for (var i=0; i<repos.length; i++) {
            if (repos[i].language !== null) {
                if (langMap[repos[i].language] === undefined) {
                    langMap[repos[i].language] = 0;
                }
                langMap[repos[i].language]++;
            }
        }

        $('#languages').empty();
        for (var lang in langMap) {
            if (langMap.hasOwnProperty(lang)) {
                $('#languages').append('<p>' + lang + ': ' + langMap[lang] + '</p>');
            }
        }
    }

    $('#stats-button').click(function() {
        getLang($('#username').val(), 1, []);
    });
})()
