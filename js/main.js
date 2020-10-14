window.onload = function () {
    'use strict';

    // définition de la source des données :
    let source = './data/small-data.tsv';

    // traitement des données :
    d3.tsv(source).then((data, error) => {
        // si on a une erreur, on l'affiche
        if (error) throw error;

        // sinon :
        console.log(data);
    });
};