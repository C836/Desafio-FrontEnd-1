var data = {}
var sugestoes = [];

//Novo dígito 
$('#item').on('input', function (e) {
    item = $("#item").val()
    fetch(`https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=${item}&source=nanook`)

        .then((response) => {
            if (response.status === 200) {
                return response.json()
            }
        })

        .then((obj) => {
            if (obj !== undefined) {
                data = obj;
                sugestoes = [];

                //Adicionar ao array de sugestões a partir da resposta da API
                for (x in data.suggestions) {
                    sugestoes.push(data.suggestions[x].term)
                }
            }
        });

    //Exibir caixa de sugestões
    $("#item").autocomplete({
        source: sugestoes
    });
});

//Animação da caixa de envio
function abrirItens() {
    console.log(data.suggestions[0].term)
    document.getElementById("form").style.top = "140px"
    setTimeout(() => {
        exibir(data)
    }, 600)
}

//Criar os elementos da lista de produtos
async function exibir(produtos) {
    $("#areaProdutos").empty()

    for (x in produtos.products) {
        $(".transparencia:first").fadeIn();
        $(".transparencia:first").removeClass("transparencia")

        let div = document.createElement("div");
        div.classList.add("transparencia")
        div.classList.add("produto")

        div.style.display = "none"

        const h3 = document.createElement("h3");
        h3.innerText = produtos.products[x].name
        div.appendChild(h3)

        const p = document.createElement("p");
        p.innerText = produtos.products[x].id
        div.appendChild(p)

        const span = document.createElement("span")
        span.innerText = produtos.products[x]._meta.visitsClickCount
        const img = document.createElement("img");
        img.setAttribute('src', './images/carret.svg');
        span.appendChild(img)
        div.appendChild(span)

        document.getElementById("areaProdutos").appendChild(div);
    }
    $(".transparencia:first").fadeIn();
    $(".transparencia:first").removeClass("transparencia")
}