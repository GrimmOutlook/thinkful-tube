var endpointURL = "https://www.googleapis.com/youtube/v3/search";

// Fxn to GET data from API
function getDataFromAPI(searchTerm, callback){
  var settings = {
    url: OMDB_BASE_URL,
    data: {
      s: searchTerm,
      r: 'json',
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}


// Callback Fxn that displays the data from API upon successful retrieval
function displayYouTubeData(data) {
  var resultElement = '';
  if (data.Search) {
    data.Search.forEach(function(item) {
     resultElement += '<p>' + item.Title + '</p>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }

  $('.js-search-results').html(resultElement);
}



// Event Listener Fxn that, upon event trigger, calls the GET data fxn, passing in as arguments the user's input and the callback fxn.
function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYouTubeData);
  });
}



// Call the Event Listener Fxn???
$(function(){watchSubmit();});
