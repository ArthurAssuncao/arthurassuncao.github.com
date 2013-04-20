$(document).ready(function() {
    $.getJSON('https://api.github.com/users/ArthurAssuncao/repos?&sort=updated', function(resp) {
        if (resp.length > 0) {
            $('#github-repos').append('<ul id="project-list" class="unstyled"></ul>');
            var tags_li = '';
            $.each(resp, function(i, repositorio) {
                var tag_name = '<h2 class="project-name">' + repositorio['name'] + '</h2>';
                var tag_language = '<h3 class="project-language muted">' + ((repositorio['language']) ? repositorio['language'] : '') + '</h3>';
                var tag_description = '<p class="project-description">' + ((repositorio['description']) ? repositorio['description'] : '') + '</p>';
                var tag_li = '<li class="github-project sombra well span3"><a href="' + repositorio['html_url'] + '">' + tag_name + tag_language + tag_description + '</a></li>';
                tags_li += tag_li;
            });
            $('#github-repos > ul').append(tags_li);
        }
        else {
            $('#github-repos').append('<p>No public repositories.</p>');
        }
    });
});