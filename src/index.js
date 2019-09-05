const axios = require('axios')
const fs = require('fs');

const url = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=8f921ebb7ca9235fa55a1cfbdd6a73a85bea9018'
const vectorLetras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']


async function buscaJsonNaApi() {
    let retorno = await axios.get(url, {});
    await escreveArquivoJson(retorno.data)
}

function escreveArquivoJson(dados) {
    fs.writeFile('./src/assets/answer.json', JSON.stringify(dados), (err) => {
        if (err) {
            console.log(`Houve um erro ${err}`)
        }
    })
}



function descriptografa(frase){
    let fraseDescriptografada = "";
    for(let i = 0; i < frase.length; i++){
        let idVetor = vectorLetras.indexOf(frase[i]);
        if(idVetor !== -1){
            if((idVetor - 8) < 0){
                let resto = 8 - idVetor;
                idVetor = (vectorLetras.length-resto);
                fraseDescriptografada += vectorLetras[idVetor]   
            }else{
                fraseDescriptografada += vectorLetras[idVetor-8]
            }
        }else{
            fraseDescriptografada += frase[i]
        }
    }
    return fraseDescriptografada;
}

async function lerArquivoJson() {

    return await new Promise(resolve => {
        fs.readFile('./src/assets/answer.json', 'utf8', (err, data) => {
        
            let objArquivo = JSON.parse(data);
    
            objArquivo.decifrado = descriptografa(objArquivo.cifrado)
            resolve(objArquivo);
        })
    }, reject => {

    });
    
}

async function chama(){
    let data = await lerArquivoJson();
    console.log(data);
    
}


chama();
