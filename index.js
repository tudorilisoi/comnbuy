const bestBuySearch = 'https://api.bestbuy.com/v1/products';
const walMartSearch = 'https://api.walmartlabs.com/v1/search?';

//http://api.walmartlabs.com/v1/search?apiKey={apiKey}&query=laptop&facet=on


let search = "";
let searchTerm = "";


//const STORE = {walMartSearch}


function getDataFromApi() {
  //alert('Are we getting data at all ?');

  let searchUrl = "";
  let jsonDataType = "";


  if (search == "bestbuy") {
    searchUrl = bestBuySearch + "(search=" + searchTerm + ")";
    jsonDataType = 'json';
  }
  else {
    searchUrl = walMartSearch + 'query=' + searchTerm + '&format=json&apiKey=9puezpg9ppwzytwy7grqvr64';
    jsonDataType = 'jsonp';
  }


  const settings = {
    url: searchUrl,
    data: {
      format: 'json',
      apiKey: 'pwMuSpdnoeB0ZkCAuqlxJGuI',
      show: 'sku,name,salePrice',
      //query: 'laptop',
    },
    dataType: jsonDataType,
    type: 'GET',
    success: displaySearchData,
    error: handleerror
  };
  $.ajax(settings);
}

function handleerror() {
  alert('we had an error');
}

function renderResult(result) {

  if (search == "bestbuy") {
    return `<p> ${result.name} </p>
            <li class="comparison-item">
              <ul class="resultcolumn">
                <li> Rating: ${result.customerReviewCount}</li>
                <li> Reviews: ${result.customerReviewAverage}</li>
              </ul>
              <ul class="resultcolumn">
                <li> Regular price:${result.regularPrice}</li>
                <li> Sale Price: ${result.salePrice}</li>
              </ul>
            </li>`
  }
  else {
    return `<p> ${result.name} </p>
            <li class="comparison-item">
              <ul class="resultcolumn">
                <li> Rating: ${result.customerRating}</li>
                <li> Reviews: ${result.numReviews}</li>
              </ul>
              <ul class="resultcolumn">
                <li> Regular price:${result.items}</li>
                <li> Sale Price: ${result.salePrice}</li>

              </ul>
            </li>`
  }
}

function displaySearchData(data) {
  if (search == 'bestbuy') {
    const results = data.products.map((product) => renderResult(product));
    $('.bestbuycomparisonlist').append(results);
  } else {
    const results = data.items.map((item) => renderResult(item));
    $('.walmartcomparisonlist').append(results);
  }
}

function watchSubmit() {
  $('.js-searchBestbuy-form').submit(event => {
    event.preventDefault();
    $(".bestbuycomparisonlist").empty();
    search = "bestbuy";
    const queryTarget = $(event.currentTarget).find('#site-search');
    searchTerm = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(displaySearchData);
  });

  $('.js-searchWalmart-form').submit(event => {
    event.preventDefault();
    $(".walmartcomparisonlist").empty();
    search = "walmart";
    const queryTarget = $(event.currentTarget).find('#site-search');
    searchTerm = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(displaySearchData);
  });
}

$(watchSubmit);


/* ADDING SMOOTH SCROLLING TO PAGES*/

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});