function generate_projects(user){
    $.getJSON('https://api.github.com/users/' + user + '/repos?&sort=updated', function(resp) {
        if (resp.length > 0) {
            $('#github-gpg-repos').append('<ul id="project-gpg-list" class="unstyled"></ul>');
            var tags_li = '';
            $.each(resp, function(i, repositorio) {
                var tag_name = '<h2 class="project-gpg-name">' + repositorio['name'] + '</h2>';
                var tag_language = '<h3 class="project-gpg-language muted">' + ((repositorio['language']) ? repositorio['language'] : '') + '</h3>';
                var tag_description = '<p class="project-gpg-description">' + ((repositorio['description']) ? repositorio['description'] : '') + '</p>';
                var tag_li = '<li class="github-gpg-project github-gpg-sombra well span3"><a href="' + repositorio['html_url'] + '">' + tag_name + tag_language + tag_description + '</a></li>';
                tags_li += tag_li;
            });
            $('#github-gpg-repos > ul').append(tags_li);
        }
        else {
            $('#github-gpg-repos').append('<p>No public repositories.</p>');
        }
    });
}

(function($){
    $.GithubPortfolioGenerator = function(settings){
        var config = {
            'user': 'ArthurAssuncao',
        };
        if (settings){$.extend(config, settings);}
        console.log(config);
        console.log(settings);
        generate_projects(config.user);

        return this;
    };
})(jQuery);