


//NOTAS DO CRIADOR
//Tá tudo errado essa bosta mas funciona.









document.addEventListener("DOMContentLoaded", function() {
    const pokemonSelect = document.getElementById("pokemonSelect");
    const pokemonImage = document.getElementById("pokemonImage");
    const pokemonName = document.getElementById("pokemonName");
    const pokemonType = document.getElementById("pokemonType");
    const pokemonNumber = document.getElementById("pokemonNumber");
    const pokemonDetails = document.getElementById("pokemonDetails");

    function fetchPokemonData(pokemonName) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => response.json())
            .then(data => {
                const name = data.name;
                const imageUrl = data.sprites.front_default;
                const type = data.types[0].type.name;
                const number = data.id;

                pokemonImage.src = imageUrl;
                pokemonName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
                pokemonType.textContent = "Tipo: " + type.charAt(0).toUpperCase() + type.slice(1);
                pokemonNumber.textContent = `#${number}`;

                fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
                    .then(response => response.json())
                    .then(speciesData => {
                        const height = data.height * 10;
                        const weight = data.weight / 10;
                        const generation = speciesData.generation.name;
                        const img = speciesData.varieties[0].pokemon.url;
                        const img_3d = speciesData.varieties[0].pokemon.url + "?format=3d";
                        const img_shiny = imageUrl.replace("/pokemon/", "/pokemon-shiny/");

                        pokemonDetails.innerHTML = `
                            <p><b>Altura: ${height} cm</b></p>
                            <p><b>Peso: ${weight} kg</b></p>
                            <p><b>Geração: ${generation} </b></p>
                        `;
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }

    function fillPokemonSelect() {
        for (let i = 1; i <= 1000; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(response => response.json())
                .then(data => {
                    const name = data.name;
                    const option = document.createElement("option");
                    option.value = name;
                    option.text = name.charAt(0).toUpperCase() + name.slice(1);
                    pokemonSelect.appendChild(option);
                })
                .catch(error => console.error(error));
        }
    }

    fillPokemonSelect();

    pokemonSelect.addEventListener("change", function() {
        const selectedPokemonName = pokemonSelect.value;
        fetchPokemonData(selectedPokemonName);
    });

    fetchPokemonData("bulbasaur"); 
});
