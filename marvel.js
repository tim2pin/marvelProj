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
    
    var headerContainer = $.create('header');
    var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;
    var name = character.name;

    var nameTag = $.create('character-name');
    var nameTextNode = $.createText(name);
    var img = $.create('img');
    $.setAttribute(img, 'src', imgPath);
    
    
    $.appendChild(headerContainer, nameTag);

    $.appendChild(nameTag, nameTextNode);
    $.appendChild(headerContainer, img);
        
    var container = $('header');
    $.appendChild(container, headerContainer);


    function mouseOverFunction(){
      alert ("These are all the comics The Unbeatable Squirrel Girl appears in:");
    }

    $("character-name").addEventListener("mouseover", mouseOverFunction);

    

  }); 
});

marvel('/characters/1010860/comics').then(function(json) { 
  json.data.results.map(function(comic){

    var comicContainer = $.create('comic');
    var imgPath = comic.thumbnail.path + '.' + comic.thumbnail.extension;

    var name = comic.title;
    var img = $.create('img'); // Create an element node
    $.setAttribute(img, 'src', imgPath); // Set some properties on the node

    var nameTag = $.create('comic-name'); //create element node
    var nameTextNode = $.createText(name); //create text node

    $.appendChild(nameTag, nameTextNode);
    $.appendChild(comicContainer, img);
    $.appendChild(comicContainer, nameTag);
    
    var container = $('comics');
    $.appendChild(container, comicContainer);

  }); 
});
