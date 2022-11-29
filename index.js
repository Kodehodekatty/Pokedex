// hex color codes for the different types

const typeColors = {
  "normal": "A8A77A",
  "fire": "EE8130",
  "water": "6390F0",
  "electric": "F7D02C",
  "grass": "7AC74C",
  "ice": "96D9D6",
  "fighting": "C22E28",
  "poison": "A33EA1",
  "ground": "E2BF65",
  "flying": "A98FF3",
  "psychic": "F95587",
  "bug": "A6B91A",
  "rock": "B6A136",
  "ghost": "735797",
  "dragon": "6F35FC",
  "dark": "705746",
  "steel": "B7B7CE",
  "fairy": "D685AD"
}

// async, getting the full list of pokemon, and the api URLs
 async function PokemonFetch() {
      let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      let allpokemon = await response.json();

  for(const pokemon of allpokemon.results){
    await fetchPokemonData(pokemon);
  }
}


async function fetchPokemonData(pokemon) {

  
      let url = pokemon.url
 // The fetch/json that's getting pokemon data from url
      let response = await fetch(url);
      let pokeData = await response.json(); // pokedata needs the responce first

// The fetch/json is getting species data from the url inside of the pokemon data.
      response = await fetch(pokeData.species.url); // this fetch needs pokedata first, so to get the species info it needs the pokedata
      let speciesData = await(response.json()); // 

  renderMons(pokeData, speciesData)
  
}

// Button text changing
function btnText() {

          if(shinyBtn.innerText == "click for shiny"){
            shinyBtn.innerText = "click for normal"
            shinyBtn.style.backgroundColor = "white";
            
            
            
        }else{
            shinyBtn.innerText= "click for shiny";
            shinyBtn.style.backgroundColor = "yellow";
         
            
        }

}
// the pokedex entries
function getFlavourText(textEntries){

  //
  let description = []
  description = textEntries.filter(flavor => flavor.language.name === 'en')
  .map(item => item.flavor_text.replace( // going over every item, and getting flavor_text with the arrows replaced  (this solution was found by someone in class who shared it 
  //with the rest of us who were struggling with this part of the flavor text :P)
    "\u000c",
    " "
  ).replace(/(\r\n|\n|\r)/gm, " "))// .map is essentally used to change each array element/modifying it
  // and turning it into the flavor_text string, but with the arrows replaced
  
  const num = Math.floor(Math.random() * description.length)

  //return to called function with chosen flavor_text
  return description[num]
}



function renderMons(pokeData, speciesData) {

  // the containers, DOM main container and pokecontainer with the pokemon stuff
        let mainContainer = document.getElementById('generate')

        let pokeContainer = document.createElement("div")
      
        //pokeContainer.classList.add("styling");

        pokeContainer.classList.add("pokemon")

//name

      let pokeName = document.createElement('h4')
      pokeName.innerText = pokeData.name
      pokeName.classList.add("name")

//img-non shiny

        let pokeImage = document.createElement('img')
        pokeImage.src = pokeData.sprites.front_default
        pokeImage.classList.add('image')


// image-shiny      
        let pokeShiny = document.createElement('img')
        pokeShiny.style.display = 'none';
        pokeShiny.src = pokeData.sprites.front_shiny
        pokeShiny.classList.add('shiny')

//flavor text
        let Pokeinfo = document.createElement('p')
        Pokeinfo.innerText = getFlavourText(speciesData.flavor_text_entries) 
        Pokeinfo.classList.add('flavorText')

  



// shiny button

  document.getElementById("shinyBtn").addEventListener("click", function () {
        let oldDisplay = pokeImage.style.display;
          pokeImage.style.display = pokeShiny.style.display;
          pokeShiny.style.display = oldDisplay;
     
  
   
    
  })

//the pokemon number

  let pokeNumber = document.createElement('h3')
      pokeNumber.innerText = `#${pokeData.id}`
      pokeNumber.classList.add("number")
      

// pokemon types

       let pokeTypes = document.createElement('ul')
        pokeData.types.forEach(function (type) {
       let pokeType = document.createElement('li')

      pokeType.innerText = type.type.name
      pokeType.style.color = typeColors[type.type.name]
      pokeTypes.appendChild(pokeType)
      pokeType.classList.add('type')
  })


  // appending everything to the main containers 
  pokeContainer.append(pokeName, pokeShiny, pokeImage, pokeNumber, Pokeinfo, pokeTypes);

  mainContainer.append(pokeContainer);



}

// the pokemon theme song music button (free download online), code copied and modified from my drumkit project
                
        const sounds = "Pokemon-Theme-Song.mp3";

        const btnDif = document.createElement("button");
                btnDif.classList.add("audioButton");
                btnDif.textContent = "music";


        const pauseButton = document.createElement("button");
                pauseButton.classList.add("pauseButton");
                pauseButton.textContent = "pause";
                          

        document.getElementById("musicBtn").append(btnDif, pauseButton);

                let selectSound = "./sounds/" + sounds;
                let selectedAudio = new Audio(selectSound);

// event listeners for buttons to play/pause the music

    btnDif.addEventListener("click", function () { 

      selectedAudio.play()
      });


    pauseButton.addEventListener("click", function (){
                      
       selectedAudio.pause()
                      
      });


PokemonFetch();