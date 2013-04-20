$(document).ready(function() {
    get_numero_repositorios_publicos();
    get_numero_seguidores();
    get_repositorios_atualizados(3);
    get_total_forks_estrelas();
});

function get_numero_repositorios_publicos(){
    $.getJSON('https://api.github.com/users/ArthurAssuncao/repos', function(resp) {
        $('#repositorios_publicos').html(resp.length);
    });
}

function get_numero_seguidores(){
    $.getJSON('https://api.github.com/users/ArthurAssuncao/followers', function(resp) {
        $('#github_seguidores').html(resp.length);
    });
}

function get_repositorios_atualizados(numero_repositorios){
    $.getJSON('https://api.github.com/users/ArthurAssuncao/repos?&sort=updated&per_page='+ numero_repositorios +'&page=1', function(resp) {
        if (resp.length > 0) {
            $('#recentemente_atualizados').append('<ul class="unstyled"></ul>');
            //console.log($(resp.data).sort('pushed_at', 'desc'));
            resp_ordenado = resp.sort(function(a, b) {
               var compA = a['updated_at'];
               var compB = b['updated_at'];
               return (compA < compB) ? 1 : (compA > compB) ? -1 : 0;
            });
            var tags_li = '';
            $.each(resp_ordenado, function(i, repositorio) {
                var tag_nome = '<a href="' + repositorio['html_url'] + '">' + repositorio['name'] + '</a>';
                var tag_data = '<a class="muted" href="' + repositorio['html_url'] + '/commits">' + new Date(repositorio['updated_at']).toLocaleDateString() + '</a>';
                var numero_forks = repositorio['forks_count'];
                var numero_estrelas = repositorio['watchers_count'];
                var tag_forks = '<a class="muted" href="' + repositorio['html_url'] + '/watchers">' + numero_forks + ' forks</a>';
                var tag_estrelas = '<a class="muted" href="' + repositorio['html_url'] + '/network">' + numero_estrelas + ' estrelas</a>';
                var tag_li = '<li>' + tag_nome + ' <span class="muted">' + tag_data + ' ' + tag_forks + ' ' + tag_estrelas + '</span><li>';
                tags_li += tag_li;
            });
            $('#recentemente_atualizados > ul').append(tags_li);
        }
        else {
            $('#github-repos').append('<p>No public repositories.</p>');
        }
    });
}

function get_total_forks_estrelas(){
    $.getJSON('https://api.github.com/users/ArthurAssuncao/repos', function(resp) {
        var total_forks = 0;
        var total_estrelas = 0;
        $.each(resp, function(i, repositorio) {
            total_forks += repositorio['forks_count'];
            total_estrelas += repositorio['watchers_count'];
        });
        $('#total_forks').html(total_forks);
        $('#total_estrelas').html(total_estrelas);
    });
}