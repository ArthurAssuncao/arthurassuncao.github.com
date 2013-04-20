function generate_projects(user, slide_direction){
    var css_class = class_slide(slide_direction);
    console.log(css_class);
    $.getJSON('https://api.github.com/users/' + user + '/repos?&sort=updated', function(resp) {
        if (resp.length > 0) {
            $('#github-gpg-repos').append('<ul id="project-gpg-list" class="unstyled"></ul>');
            $.each(resp, function(i, repositorio) {
                var tag_name = '<h2 class="project-gpg-name">' + repositorio['name'] + '</h2>';
                var tag_language = '<h3 class="project-gpg-language muted">' + ((repositorio['language']) ? repositorio['language'] : '') + '</h3>';
                var tag_description = '<p class="project-gpg-description">' + ((repositorio['description']) ? repositorio['description'] : '') + '</p>';
                var tag_li = '<li class="github-gpg-project github-gpg-sombra ' + css_class + ' well span3"><a href="' + repositorio['html_url'] + '">' + tag_name + tag_language + tag_description + '</a></li>';
                $('#github-gpg-repos > ul').append(tag_li);
            });
        }
        else {
            $('#github-gpg-repos').append('<p>No public repositories.</p>');
        }
    });
}

function class_slide(slide_direction){
    var css_class = 'github-gpg-cap-bottom';
    switch(slide_direction){
        case 'top': {
            css_class = 'github-gpg-cap-top';
            break;
        }
        case 'bottom': {
            css_class = 'github-gpg-cap-bottom';
            break;
        }
        case 'left': {
            css_class = 'github-gpg-cap-left';
            break;
        }
        case 'right': {
            css_class = 'github-gpg-cap-right';
            break;
        }
    }
    return css_class;
}

(function($){
    $.GithubPortfolioGenerator = function(settings){
        var config = {
            'user': 'ArthurAssuncao',
            'slide_direction' : 'bottom',
        };
        if (settings){$.extend(config, settings);}
        generate_projects(config.user, config.slide_direction);

        return this;
    };
})(jQuery);