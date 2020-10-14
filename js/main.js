window.onload = function () {
    'use strict';

    // boutons :
    let btnAjout = document.getElementById('ajouter-donnees');
    let btnSuppr = document.getElementById('supprimer-donnees');

    // définition de la source des données :
    let source = './data/small-data.tsv';
    let source2 = './data/large-data.tsv';

    // définition des containers :
    let thead = d3.select('#tableau-head');
    let tbody = d3.select('#tableau-body');

    function gestionDonnes(src) {
        d3.tsv(src).then((data,error) => {
            if (error) throw error;
            
            // on sélectionne les données 
            let selection = tbody
                .selectAll('tr')
                .data(data);

            // exit : gestion de la suppresion
            selection
                .exit()
                .remove();
            
            // enter : ajout et update : modification 
            // on fusionne la sélection existante et on affiche toutes les lignes du tableau 
            let lignes = selection
                .enter()
                .append('tr')
                .merge(selection);

            lignes 
                .selectAll('td')
                .data((datum) => {
                    return Object.values(datum);
                })
                .enter()
                .append('td')
                .text((d) => {
                    return d;
                });
        });
    }

    // traitement des données :
    // pourrait aussi être écrit : let data = await d3.tsv(source)
    d3.tsv(source).then((data, error) => {
        // si on a une erreur, on met fin à la fonction
        if (error) throw error;

        // sinon :
        console.log(data);

        // afficher le nom des colomnes
        thead 
            .selectAll('td')
            .data(data.columns)
            .enter()
            .append('td')
            .text((d) => {
                return d;
            });

        // afficher chacune des lignes
        let lignes = tbody
            .selectAll('tr')
            .data(data)
            .enter()
            .append('tr');

        lignes
            .selectAll('td')
            .data((datum) => {
                return Object.values(datum);
            })
            .enter()
            .append('td')
            .text((d) => {
                return d;
            });
    });

    // au clic sur un bouton, on modifie les données 
    btnAjout.addEventListener('click', () => {
        gestionDonnes(source2);
    });

    btnSuppr.addEventListener('click', () => {
        gestionDonnes(source);
    });
};