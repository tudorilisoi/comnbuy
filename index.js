const bestBuySearch = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))pageSize=30?format=json&apiKey=pwMuSpdnoeB0ZkCAuqlxJGuI';
const walMartSearch = 'https://api.walmartlabs.com/v1/search?';

let search = "";
let searchTerm = "";

function getDataFromApi(callback) {
  let searchUrl = "";
  let jsonDataType = "";

  if (search == "bestbuy"){
    searchUrl = bestBuySearch;
    jsonDataType = 'json';
  } 
  else {
    searchUrl = walMartSearch + 'query=' + searchTerm + '&format=json&apiKey=9puezpg9ppwzytwy7grqvr64';
    jsonDataType = 'jsonp';
  } 

  const settings = {
    url: searchUrl,
    data: {  
        q: `${searchTerm} in:name`,
    },
    dataType: jsonDataType,
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

//amend it
function renderResult(result) {
    if (search == "bestbuy") {

    } 
  //console.log(result)
  return `
   
  `;
}
//amend it
function displaySearchData(data) {
  //console.log(data);// just to understand the data structure. delete it later
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-searchBestbuy-form').submit(event => {
    event.preventDefault();
    search = "bestbuy";
    const queryTarget = $(event.currentTarget).find('.js-query');
    searchTerm = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(displaySearchData);
  });

  $('.js-searchWalmart-form').submit(event => {
    event.preventDefault();
    search = "walmart";
    const queryTarget = $(event.currentTarget).find('.js-query');
    searchTerm = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(displaySearchData);
  });
}


$(watchSubmit);
