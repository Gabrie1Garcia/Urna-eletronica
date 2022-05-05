let seuVotoPara = document.querySelector('.divi-1-1 span');
let cargo = document.querySelector('.divi-1-2 span');
let descricao = document.querySelector('.divi-1-4');
let aviso = document.querySelector('.divi-2');
let lateral = document.querySelector('.divi-1-direita');
let numeros = document.querySelector('.divi-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = []; 


function comecarEtapa() {
     let etapa = etapas[etapaAtual];

     let numeroHtml = '';
     numero = ''; 
     votoBranco = false;

     for(let i = 0; i < etapa.numeros; i++) {
         if (i === 0) {
             numeroHtml += '<div class="numero pisca"></div>';
         } else {
             numeroHtml += '<div class="numero"></div>'
         }
         
     }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo; 
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = ''; 
    numeros.innerHTML = numeroHtml; 
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false; 
        }
    }); 
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;

        let fotosHtml = ''; 
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="assets/${candidato.fotos[i].url}" alt=""height="120px" width="90px">${candidato.fotos[i].legenda}</div>`; 
            } else {
                fotosHtml += `<div class="d-1-image"><img src="assets/${candidato.fotos[i].url}" alt=""height="100px" width="90px">${candidato.fotos[i].legenda}</div>`;
            }
            
        }

        lateral.innerHTML = fotosHtml; 
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
  }

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
          elNumero.nextElementSibling.classList.add('pisca');   
        } else {
            atualizaInterface();
        }
       
    }
}

function branco() {
    if (numero === '') {
         votoBranco = true; 
         seuVotoPara.style.display = 'block';
         aviso.style.display = 'block';
         numeros.innerHTML = '';
         descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert('Para votar em BRANCO, não digite nem um número')
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = true;
    
    if (votoBranco == true) {
        votoConfirmado = true;
        console.log("Confrimando voto em Branco...");
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log("Confrimando como " + numero);
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined){
             comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
        }
    }
}

comecarEtapa();