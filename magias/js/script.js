//id;marcacao;titulo;tipo;tempo;alcance;componentes;duracao;descricao
function Magia(id, marcacao, titulo, tipo, tempo, alcance, componentes, duracao, descricao) {
    this.id = id,
    this.marcacao = marcacao,
    this.titulo = titulo,
    this.tipo = tipo,
    this.tempo = tempo,
    this.alcance = alcance,
    this.componentes = componentes,
    this.duracao = duracao,
    this.descricao = descricao
}

function carregarArquivoTXT(acao, livro) {
    
    var arquivo = 'magias-'+acao+'-'+livro;
    //console.log(livro);
    fetch('resources/'+arquivo+'.txt')
        .then(response => response.text())
        .then(text => {
            if(acao == 'lista') {
                carregarListaMagias(text, livro);
            } else if(acao == 'descricao') {
                carregarDescricaoMagia(text);
            }
    })
}

function carregarListaMagias(text, livro) {
    var html = [];
    var cont = 1;
    const array = text.split(";");
    //console.log(array.length);

    html.push("<table>");
    for(i = 0;i < array.length; i++) {
        //console.log(i+"-"+array[i]);
        if(cont==1) { //pular linha
            html.push("<tr>");
        }
        if(array[i] != "") {
            if(i > 9) { //titulo
                html.push("<td id='magia"+i+"'><a href='descricao.html?id="+i+"&livro="+livro+"'>"+array[i].replace("0", "")+"</td>"); 
            } else {
                html.push("<th id='magia"+i+"'>"+array[i].replace("0", "")+"</th>"); 
            }
        }
        cont++;
        if(cont>10) { //pular linha
            html.push("</tr>");
            cont = 1;
        }
    }
    html.push("</table>");

    //rodape
    html.push("<div class='footer'><p>Contemplem o Mago! &copy; by <b>ERU</b></p></div>");
    
    //console.log(html.join(""));
    document.getElementById("lista-magias").innerHTML = html.join("");
}

function carregarDescricaoMagia(text) {
    //pega id da url
    var urlString = window.location.href;
    var id = new URL(urlString).searchParams.get("id");
    //console.log(id);

    var lines = text.split("\r\n");
    var magia1;

    //ler linha por linha
    for(var i  in lines) {
        var magia = lines[i].split(";"); //depois separa os atributos
        if(magia[0] == id) {
            magia1 = new Magia(magia[0], magia[1], magia[2], magia[3], magia[4], magia[5], magia[6], magia[7], magia[8]);
            //console.log(magia1);
            break;
        }
    }

    if(magia1 != null) {
        var html = [];

        //validacoes
        if(magia1.titulo != null) {
            html.push('<h1>'+magia1.titulo+'</h1>');
        } else {
            html.push('<h1>Título: N/A</h1>');
        }

        if(magia1.tipo != null) {
            html.push('<h3>'+magia1.tipo+'</h3>');
        } else {
            html.push('<h3>Nível: N/A</h3>');
        }

        if(magia1.tempo != null) {
            html.push('<h3>'+magia1.tempo+'</h3>');
        } else {
            html.push('<h3>Tempo de Conjuração: N/A</h3>');
        }

        if(magia1.alcance != null) {
            html.push('<h3>'+magia1.alcance+'</h3>');
        } else {
            html.push('<h3>Alcance: N/A</h3>');
        }

        if(magia1.componentes != null) {
            html.push('<h3>'+magia1.componentes+'</h3>');
        } else {
            html.push('<h3>Componentes: N/A</h3>');
        }

        if(magia1.duracao != null) {
            html.push('<h3>'+magia1.duracao+'</h3>');
        } else {
            html.push('<h3>Duração: N/A</h3>');
        }

        if(magia1.descricao != null) {
            html.push('<span>'+magia1.descricao+'</span>');
        } else {
            html.push('<span>Descrição: N/A</span>');
        }

        document.getElementById('magia').innerHTML = html.join("");
    }
}