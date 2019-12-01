let selectBreed = document.getElementById("dog-breed");

const url = "https://dog.ceo/api/breeds/list/all";

fetch(url)
    .then(
        resp => {
            if (resp.status !== 200) {
                console.error(`Error: ${resp.status}`);
                return;
            }

            resp.json().then(
                function(data) {
                    const regexSimbolsOne = /\[\"|"|]/g;
                    var arrayAuxiliador = [];
                    var subRacaJson = 0;
                    var countServer = 0;
                    let option;
                    let suboption;

                    for (let i = 0; i < Object.keys(data.message).length; i++) {

                        option = document.createElement('option');
                        option.text = Object.keys(data.message)[i];
                        option.value = option.text;

                        if (Object.values(data.message)[i].length > 0) {
                            var subRacaJson = JSON.stringify(Object.values(data.message)[i]);
                            var arrayAuxiliador = subRacaJson.split(",");
                            for (let j = 0; j < arrayAuxiliador.length; j++) {
                                suboption = document.createElement('option');
                                suboption.text = (Object.keys(data.message)[i] + ' - ' + ((arrayAuxiliador[j].toString()).replace(regexSimbolsOne, "")));
                                suboption.value = suboption.text;
                                selectBreed.add(suboption);
                            }

                        } else {
                            selectBreed.add(option);
                        }
                    }
                }
            );

        }
    )
    .catch(function(errorEvent) {
        console.error(`Error FetchAPI = ${errorEvent}`);
    });


const registrarDados = () => {
    limparDados();
    const regexSimbolsTwo = / - /g;
    let dogBreed = document.getElementById("dog-breed").value.trim();
    let nameDog = document.getElementById("nameDog").value.trim();
    let color = document.getElementById("color").value.trim();
    let typeFont = document.getElementById("font").value.trim();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let timeRecord = Date.call();

    dogBreed = dogBreed.toLocaleLowerCase();
    dogBreed = dogBreed.replace(regexSimbolsTwo, "/");
    const urlImg = `https://dog.ceo/api/breed/${dogBreed}/images/random`;

    localStorage.setItem("dogBreed", dogBreed);
    localStorage.setItem("nameDog", nameDog);
    localStorage.setItem("color", color);
    localStorage.setItem("typeFont", typeFont);
    localStorage.setItem("timeRecord", timeRecord);
    localStorage.setItem("UrlImagem", urlImg);
}

const limparDados = () => {
    localStorage.clear();
}

window.addEventListener("load", function() {
    const regexSimbolsThree = /\[|"|,| /g;
    let loadBreed = localStorage.getItem("dogBreed");
    let loadNameDog = localStorage.getItem("nameDog");
    let loadColor = localStorage.getItem("color");
    let loadFontType = localStorage.getItem("typeFont");
    let loadTimeRecord = localStorage.getItem("timeRecord");
    let loadImgCachorro = localStorage.getItem("UrlImagem");

    if (loadTimeRecord !== null) {
        let currentElement = document.getElementById("info-insert")
        currentElement.innerHTML = (
            '<span>' + "Nome: " + loadNameDog + "<br/>" + "Raça: " + loadBreed + '</span>'
        );
        currentElement.classList.add(loadFontType.toLocaleLowerCase())
        currentElement.classList.add(loadColor.toLocaleLowerCase())

        fetch(loadImgCachorro)
            .then(
                respImg => {
                    if (respImg.status !== 200) {
                        console.error(`Erro na resposta da API: ${respImg.status}`)
                        return;
                    }

                    respImg.json().then(
                        function(dataImg) {
                            let urlImageDog = Object.values(dataImg.message).toString()
                            urlImageDog = urlImageDog.replace(regexSimbolsThree, "")
                            document.getElementById("image-dog").setAttribute("src", urlImageDog)
                            document.getElementById("image-dog").setAttribute("alt", loadNameDog + ": " + loadBreed)
                        }

                    )
                }
            )
            .catch(function(errorEvent) {
                console.error(`Erro no FetchAPI = ${errorEvent}`)
            });
        document.getElementById("message-adoption").classList.add("active");
    }
});