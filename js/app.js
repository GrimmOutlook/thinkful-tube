var endpointURL = "https://www.googleapis.com/youtube/v3/search";
var keyAPI = "AIzaSyAncBniQgCj-nLAHLkTsjoqr0StEA7y2k0";

// Fxn to GET data from API
function getDataFromAPI(searchTerm, callback){
  var settings = {
    url: endpointURL,
    data: {
      q: searchTerm,
      key: keyAPI,
      part: 'snippet'
    },
    dataType: 'json',
    method: 'GET',
    success: callback
  };
  $.ajax(settings);
}


// Callback Fxn that displays the data from API upon successful retrieval
function displayYouTubeData(data) {
  var resultElement = '';
  if (data.items.length > 0) {
    data.items.forEach(function(thumb) {
     resultElement += '<li class="thumbnail-items">' + '<a href="https://www.youtube.com/watch?v=' + thumb.id.videoId + '" target="_blank">' + '<img src="' + thumb.snippet.thumbnails.medium.url + '">' + '</a>' + '<caption>' + thumb.snippet.title + '</caption>' + '<summary>' + thumb.snippet.description + '</summary>' + '</li>';
    });
  }
  else {
    resultElement += '<p>No results, please try again!</p>';
  }

  console.log(resultElement);

  $('.thumbnail-grid').html(resultElement);
  console.log(data.nextPageToken);
}



// Event Listener Fxn that, upon event trigger, calls the GET data fxn, passing in as arguments the user's input and the callback fxn.
function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromAPI(query, displayYouTubeData);
  });
}



// Call the Event Listener Fxn???
$(function(){watchSubmit();});
