var endpointURL = "https://www.googleapis.com/youtube/v3/search";
var keyAPI = "AIzaSyAncBniQgCj-nLAHLkTsjoqr0StEA7y2k0";

var state = {
  nextPageToken: '',
  prevPageToken: ''
};


// ----------------------  Initial retrieval & display fxns.  ------------------------

// Fxn to GET data from API
function getDataFromAPI(searchTerm, callback, token){
  var settings = {
    url: endpointURL,
    data: {
      q: searchTerm,
      pageToken: token,
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
function displayYouTubeData(data){
  debugger
  var resultElement = '';
  if (data.items.length > 0){
    data.items.forEach(function(thumb){
     resultElement += '<li class="thumbnail-items">' + '<a href="https://www.youtube.com/watch?v=' + thumb.id.videoId + '" target="_blank">' + '<img src="' + thumb.snippet.thumbnails.medium.url + '">' + '</a>' + '<caption>' + thumb.snippet.title + '</caption>' + '<summary>' + thumb.snippet.description + '</summary>' + '</li>';
    });
  }
  else {
    resultElement += '<p>No results, please try again!</p>';
  }

  $('.thumbnail-grid').html(resultElement);
  console.log(data.nextPageToken + ' displayYouTubeData fxn');
  state.nextPageToken = data.nextPageToken

    var nextPage = '<a class="next" href="#">Next 5 Results >></a>';
  $('.next-page').html(nextPage);
  next();
}


// --------------------------  Next Page Display Fxn.  ------------------------------

function displayNext(data){
  $('.thumbnail-grid').hide();
  var resultElement = '';
  if (data.items.length > 0){
    data.items.forEach(function(thumb){
     resultElement += '<li class="thumbnail-items">' + '<a href="https://www.youtube.com/watch?v=' + thumb.id.videoId + '" target="_blank">' + '<img src="' + thumb.snippet.thumbnails.medium.url + '">' + '</a>' + '<caption>' + thumb.snippet.title + '</caption>' + '<summary>' + thumb.snippet.description + '</summary>' + '</li>';
    });
  }
  else {
    resultElement += '<p>No more results, try another search!</p>';
  }

  $('.thumbnail-grid').show();
  $('.thumbnail-grid').html(resultElement);
  state.prevPageToken = data.prevPageToken
  state.nextPageToken = data.nextPageToken

  if (state.prevPageToken){
    var prevPage = '<a class="prev" href="#"><< Previous 5 Results</a>';
    $('.previous-page').html(prevPage);
  }
  else {
    $('.previous-page').hide();
  }

    var nextPage = '<a class="next" href="#">Next 5 Results >></a>';
  $('.next-page').html(nextPage);
  next();
  prev();
}


// ---------------------------  Prev Page Display Fxn.  -----------------------------

function displayPrev(data){
  $('.thumbnail-grid').hide();
  var resultElement = '';
  if (data.items.length > 0){
    data.items.forEach(function(thumb){
     resultElement += '<li class="thumbnail-items">' + '<a href="https://www.youtube.com/watch?v=' + thumb.id.videoId + '" target="_blank">' + '<img src="' + thumb.snippet.thumbnails.medium.url + '">' + '</a>' + '<caption>' + thumb.snippet.title + '</caption>' + '<summary>' + thumb.snippet.description + '</summary>' + '</li>';
    });
  }
  else {
    resultElement += '<p>No more results, try another search!</p>';
  }

  $('.thumbnail-grid').show();
  $('.thumbnail-grid').html(resultElement);
  state.prevPageToken = data.prevPageToken
  state.nextPageToken = data.nextPageToken

  if (state.prevPageToken){
    var prevPage = '<a class="prev" href="#"><< Previous 5 Results</a>';
    $('.previous-page').html(prevPage);
  }
  else {
    $('.previous-page').hide();
  }

    var nextPage = '<a class="next" href="#">Next 5 Results >></a>';
  $('.next-page').html(nextPage);
  next();
  prev();
}


// ----------------------------  Event Listener Fxns.  ------------------------------

// Event Listener Fxn that, upon event trigger, calls the GET data fxn, passing in as arguments the user's input and the callback fxn.
function watchSubmit(){
  $('.js-search-form').submit(function(e){
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromAPI(query, displayYouTubeData);
  });
}

function next(){
  $('.next').click(function(e){
    e.preventDefault();
    var query = $('.js-search-form').find('.js-query').val();
    var nextPage = state.nextPageToken;
    getDataFromAPI(query, displayNext, nextPage);
  });
}

function prev(){
  $('.prev').click(function(e){
    e.preventDefault();
    var query = $('.js-search-form').find('.js-query').val();
    var prevPage = state.prevPageToken;
    getDataFromAPI(query, displayPrev, prevPage);
  });
}

// ---------------------  Call the 1st Event Listener Fxn.  ---------------------------

$(function(){watchSubmit();});

