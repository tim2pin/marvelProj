function fetchJSON(url) {  //gets data from server ,brings it back, checks if its json
  return fetch(url).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
}

function marvelFactory(config) {    // utilizes hash key to transmit to marvel api
  return function(path) {
    var timestamp = new Date().getTime();
    var hash = CryptoJS.MD5(timestamp + config.privateKey + config.publicKey).toString();
    var url = config.hostname + '/v' + config.version + '/public' + path + '?apikey=' + config.publicKey + '&ts=' + timestamp + '&hash=' + hash;
    console.log(url);

    return fetchJSON(url);
  }
}

// Get an instance of the marvel api
var marvel = marvelFactory({
  hostname: 'http://gateway.marvel.com',
  publicKey: '1e883cd8e8224161c01454a8a00291d4',
  privateKey: '88effafb5aac6f6ed47faa06d51782c4c8e796f7',
  version: '1'
});

function $(selector) {
  return document.querySelector(selector);
}

$.create = function(elementName) {
  return document.createElement(elementName);
}

$.createText = function(text) {
  return document.createTextNode(text);
}

$.setAttribute = function(el, attr, val) {
  return el.setAttribute(attr, val);
}

$.appendChild = function(parentElement, childElement) {
  return parentElement.appendChild(childElement);
}


marvel('/characters/1010860').then(function(json) { 
  json.data.results.map(function(character) {
    var headerContainer = document.createElement('header');
    var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;
    var name = character.name;


    var img = document.createElement('img');
    img.setAttribute('src', imgPath);
    
    var nameTag = document.createElement('character-name');
    var nameTextNode = document.createTextNode(name);

    nameTag.appendChild(nameTextNode);
    headerContainer.appendChild(img);
    headerContainer.appendChild(nameTag);
    


    var container = document.querySelector('header');


    container.appendChild(headerContainer);





  }); 
});
marvel('/characters/1010860/comics').then(function(json) { 
  json.data.results.map(function(comic){

    var comicContainer = document.createElement('comic');
    var imgPath = comic.thumbnail.path + '.' + comic.thumbnail.extension;

    var name = comic.title;

    var img = document.createElement('img'); // Create an element node
    img.setAttribute('src', imgPath); // Set some properties on the node

    //document.querySelector('body').appendChild(img); // Attached the node to the document
   

    
    var nameTag = document.createElement('comic-name'); //create element node
    var nameTextNode = document.createTextNode(name); //create text node

    nameTag.appendChild(nameTextNode);
    comicContainer.appendChild(img);
    comicContainer.appendChild(nameTag);
    


    var container = document.querySelector('comics');


    container.appendChild(comicContainer);


  }); 
});


// marvel('/characters/1010860/comics').then(function(json) { 
//   json.data.results.map(function(character){

//     var characterContainer = document.createElement('character') 
//     var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;

//     var name = character.title;

//     var img = document.createElement('img'); // Create an element node
//     img.setAttribute('src', imgPath); // Set some properties on the node

//     //document.querySelector('body').appendChild(img); // Attached the node to the document
   

    
//     var nameTag = document.createElement('character-name'); //create element node
//     var nameTextNode = document.createTextNode(name); //create text node

//     nameTag.appendChild(nameTextNode);
//     characterContainer.appendChild(nameTag);
//     characterContainer.appendChild(img);


//     var container = document.querySelector('characters');


//     container.appendChild(characterContainer);


//   }); 
// });





