const axios = require('axios')
const fs = require('fs');

const url = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=8f921ebb7ca9235fa55a1cfbdd6a73a85bea9018'

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

buscaJsonNaApi()