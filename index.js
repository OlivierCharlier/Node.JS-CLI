#!/usr/bin/env node

//déclarer les modules pr qu'il trouve les fonctions
const { getCode } = require('country-list');
const axios = require('axios').default;

let ArgsInput = process.argv.slice(2);
//2 renvoie le pays  -> node . Belgium dans la console doit renvoyer Belgium
//2 prend l'attribut
// 1 renvoie le chemin du dossier
let CountryInput = ArgsInput[0];
let YearInput = ArgsInput[1];
//0 -> veut dire que ça doit prendre la première valeur de array
// console.log(CountryInput);
// console.log(YearInput);
//node . Belgium dans la console doit renvoyer Belgium
//converti le nom du pays en code à 2 chiffres qui est utilisé pr l'url
let CountryCode = getCode(CountryInput);
// console.log(CountryCode);

//génère l'url avec l'année des congés et sur quel pays
let CurrentYear = new Date().getFullYear()
// console.log(CurrentYear);

let URLApi;
if (YearInput === undefined) {
URLApi = "https://date.nager.at/Api/v2/PublicHolidays/"+CurrentYear+"/"+CountryCode;
}else{
URLApi = "https://date.nager.at/Api/v2/PublicHolidays/"+YearInput+"/"+CountryCode;
};
// console.log(URLApi);

axios.get(URLApi)
.then(function (response){
    let items = response.data;
    items.forEach((item, index) => {
        console.log(
            `${index + 1} : ${item.date} - ${item.name} (${item.localName})`
        );
    });
})