const pessoas = {'nome':'Pessoas', 'id':'pessoas', 'palavras':['breno','ana','gustavo','carlinhos','patricia','rachel','josiane','mary','matheus','lucas','andrea','paulinho','alessandro']}
const alimentos = {'nome':'Alimentos', 'id':'alimentos', 'palavras':['banana','maca','arroz','feijao','batata','morango','carne','frango','picole','pipoca','bolo','pudim','brigadeiro','canja','cahorro quente']}
const profissoes = {'nome':'Profissões', 'id':'profissoes', 'palavras':['medico','advogado','dentista','engenheiro','programador','quimico','biologo','professor','jardineiro','faxineiro']}
const animais = {'nome': 'Animais', 'id':'animais', 'palavras':['borboleta','cachorro','gato','lobo-guara','mico-leao dourado','jabuti','tartaruga','leao','tigre','papagaio','arara','calopsita','periquito','gamba','mariposa','galinha','vaca','boi','touro']}

const arrayObjetosTema = [pessoas, alimentos, profissoes, animais]

const containerSelecaoTemas = document.querySelector('.selecao-tema');
const opcoesTemasContainer = document.querySelector('.temas');
const botao = document.querySelector('button');

const containerJogo = document.querySelector('.container-jogo');
const containerQtdErros = document.querySelector('.erros-texto');
const containerChutesErrados = document.querySelector('.chutes-errados-span');
const inputChute = document.querySelector('input[type=text]');
const containerPalavraSecreta = document.querySelector('.spans');

criaInputsTemas(arrayObjetosTema)
const inputsRadio = opcoesTemasContainer.querySelectorAll('input[type=radio]')

botao.addEventListener('click', () => {
    inputsRadio.forEach(input => {
        if(input.checked == true){
            arrayObjetosTema.forEach(tema => {
                if(tema.id == input.id){
                    iniciaJogo(tema)
                }
            })
        }
    })
})

function iniciaJogo(objetoTema){
    containerJogo.style.display = 'flex';
    containerSelecaoTemas.style.display = 'none';

    const palavra = palavraAleatoria(objetoTema);
    criaEspacosDeTexto(palavra, objetoTema);
    validaRegrasPartida(palavra);
}

function criaInputsTemas(arrayObjetosTema){
    arrayObjetosTema.forEach(tema => {
        opcoesTemasContainer.innerHTML += `
        <div><input type="radio" name="tema" id="${tema.id}"><span>${tema.nome}</span></div>
        `;
    })
}

function criaEspacosDeTexto(palavra, tema){
    for(let i = 0; i < palavra.length; i++){
        if(palavra[i] != ' ' && palavra[i] != '-'){
            containerPalavraSecreta.innerHTML += `
            <span id="${palavra[i]}"></span>
            `;
        }else{
            containerPalavraSecreta.innerHTML += `
            <span id="vazio" style="border:0;font-weight:bold">${palavra[i]}</span>
            `;
        }
    }
    document.querySelector('.container-jogo > span')
    .innerHTML = "Tema: "+ tema.nome
}

function palavraAleatoria(tema){
    let random = parseInt(Math.random() * tema.palavras.length)
    let palavraEscolhida = tema.palavras[random]
    console.log(palavraEscolhida)
    return palavraEscolhida
}

function validaRegrasPartida(palavra){
    let errosRestantes = 6;
    let errosCometidos = 0;
    let certas = 0;
    let spans = containerPalavraSecreta.querySelectorAll('span')
    spans.forEach((span) => {
        if(span.id == 'vazio'){
            certas += 1
        }
    })
    inputChute.addEventListener('change', () => {
        let errado = true;
        if(validaInput(inputChute.value)){
            spans.forEach(span => {
                if(span.id == inputChute.value.toLowerCase()){
                    if(span.innerHTML != span.id){
                        span.innerHTML = span.id;
                        certas += 1
                    }else{
                        alert('A LETRA "'+inputChute.value+'" JÁ FOI ESCOLHIDA.\nEscolha outra.')
                    }
                    errado = false;
                }
            });
            if(errado){
                containerChutesErrados.innerHTML += `<span>${inputChute.value}</span>`
                errosRestantes -= 1;
                errosCometidos += 1
                containerQtdErros.innerHTML = `
                    <p>ERROS RESTANTES: ${errosRestantes}</p>
                    <p>ERROS COMETIDOS: ${errosCometidos}</p>
                `;
            }if(errosRestantes == 0){
                alert('OPS, VOCÊ PERDEU!!!\nA palavra era '+palavra+'.\nClique OK para iniciar um novo jogo.')
                document.location.reload(); 
            }else if(certas == spans.length){
                alert('VOCÊ VENCEU!\nA palavra era '+palavra+'.\nClique OK para iniciar um novo jogo.')
                document.location.reload(); 
            }
        }else{
            alert('CHUTE INVÁLIDO!\nInsira somente UMA LETRA do ALFABETO por vez.')
        }
    })
}

function validaInput(inputValue){
    const alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    let certa = false;
    alfabeto.forEach(letra => {
        if(inputValue.toLowerCase() == letra){
            certa = true;
        }
    })
    if(certa == true){
        return true
    }else{
        return false
    }
}