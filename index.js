const bestBuySearch1 = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=pwMuSpdnoeB0ZkCAuqlxJGuI&pageSize=10&format=json';
const walMartSearch = 'https://api.walmartlabs.com/v1/search?';

let search = "";
let searchTerm = "";

function getDataFromApi() {
 //alert('Are we getting data at all ?');

  let searchUrl = "";
  let jsonDataType = "";

  if (search == "bestbuy") {
    searchUrl = bestBuySearch1;
    jsonDataType = 'json';
  }
  else {
    searchUrl = walMartSearch + 'query=' + searchTerm + '&format=json&apiKey=9puezpg9ppwzytwy7grqvr64';
    jsonDataType = 'jsonp';
  }
  //console.log('searchUrl =' + searchUrl);
  //console.log('jsonDataType =' + jsonDataType);
  //console.log('searchTerm =' + searchTerm);

  const settings = {
    url: searchUrl,
    data: {
      q: `${searchTerm} in:name`,
    },
    dataType: jsonDataType,
    type: 'GET',
    success: displaySearchData,
    error: handleerror 
    
  };
  $.ajax({
    url: searchUrl,
    data: {
      q: `${searchTerm}`,
    },
    dataType: jsonDataType,
    type: 'GET',
    success: displaySearchData,
    error: handleerror 
    
  });
}

function handleerror () {
  //alert('we had an error');
}

function renderResult(result) {

  if (search == "bestbuy") {
    return `
            <li class="comparison-item">
              ${result.index}, Rating: ${result.customerReviewCount}, Model: ${result.modelNumber}, Reviews: ${result.customerReviewAverage}, Regular price:${result.regularPrice}, Sale Price: ${result.salePrice}
            </li>`
  }
  else {
    `
            <li class="comparison-item">
              ${result.index}, Rating: ${result.cutomerRating}, Model: ${result.modelNumber}, Reviews: ${results.numReviews}, Regular price:${result.items}, Sale Price: ${results.salePrice}
            </li>`
  }
}

function displaySearchData(data) {
  const results = data.products.map((products, index) => renderResult(products));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-searchBestbuy-form').submit(event => {
    event.preventDefault();
    search = "bestbuy";
    const queryTarget = $(event.currentTarget).find('#site-search');
    searchTerm = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(displaySearchData);
  });

  $('.js-searchWalmart-form').submit(event => {
    event.preventDefault();
    search = "walmart";
    const queryTarget = $(event.currentTarget).find('#site-search');
    searchTerm = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(displaySearchData);
  });
}


$(watchSubmit);
