window.onload = function () {
    'use strict';

    // bouton d'ajout :
    let btnAjout = document.getElementById('changer-donnees');

    // définition de la source des données :
    let source = './data/small-data.tsv';

    // définition du container :
    let container = d3.select('#container');
    container.classed('striped', true);

    // traitement des données :
    // pourrait aussi être écrit : let data = await d3.tsv(source)
    d3.tsv(source).then((data, error) => {
        // si on a une erreur, on met fin à la fonction
        if (error) throw error;

        // sinon :
        console.log(data);

        container
            .selectAll('div')
            .data(data)
            .enter()
            .append('div')
            .classed('striped', true)
            .text((d) => {
                return d.Name;
            });
    });

    // au clic sur le bouton, on modifie les données
    btnAjout.addEventListener('click', () => {
        // on définit une autre source
        let source2 = './data/large-data.tsv';

        d3.tsv(source2).then((data,error) => {
            if (error) throw error;
            
            // on sélectionne les données 
            let selection = container
                .selectAll('div')
                .data(data);
            
            // on fusionne la sélection avec ce qu'il y avait avant, en affichant le nom
            selection
                .enter()
                .append('div')
                .merge(selection)
                .text((d) => {
                    return d.Name;
                });
        });
    });
};