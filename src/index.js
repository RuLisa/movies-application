/**
 * es6 modules and imports
 */
const $ = require('jquery');
const {getMovies} = require('./api.js');//require is importing the from api.js which is pulling the data from the db

import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */


//PAGE LOADING...
// $('body').append('<div style="font-size: 50px " id="loadingDiv"><div class="loader text-center">RUUSA & LISA <br>page loading...</div></div>');

// $(window).on('load', function(){
//     setTimeout(removeLoader, 5000); //wait for page load PLUS two seconds.
// });
// function removeLoader(){
//     $( "#loadingDiv" ).fadeOut(100, function() {
//         // fadeOut complete. Remove the loading div
//         $( "#loadingDiv" ).remove();
//     });
// }



// $("#submitButton").click(function(){
//     var search = $('#listHere').val();
//
//     $.ajax({
//         url: '/api/movies',
//         type: 'post',
//         data: {search:search},
//         beforeSend: function(){
//             // Show image container
//             $("#loader").show();
//         },
//         success: function(response){
//             $('.response').empty();
//             $('.response').append(response);
//         },
//         complete:function(data){
//             // Hide image container
//             $("#loader").hide();
//         }
//     });

    $("#submitButton").click(function() {
        const search = $('#insertHere').val();
        const moviePost = (`${title} ${rating}`);
        const url = '../api/movies';
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(moviePost),
            data: {search: search}
            };

        fetch(url, options)({
            beforeSend: function () {
                // Show image container
                $("#loader").show()
            },

        success: function (response) {
            $('.response').empty();
            $('.response').append(response);
            },

        complete:function (data) {
            // Hide image container
            $("#loader").hide();
            }
        })
    })


//
// const title = document.getElementById("title").value;
// const rating = document.getElementById("rating").value;
//
//
// document.getElementById("title").innerHTML=title;
// document.getElementById("rating").innerHTML=rating;


// var qty = document.getElementById("quantity").value;
// qtyTotal = qtyTotal + parseInt(qty);
// document.getElementById("qtyTotals").innerHTML=qtyTotal;
//
// var price = document.getElementById("price").value;
// priceTotal = priceTotal + parseInt(price);
// document.getElementById("priceTotals").innerHTML=priceTotal;









//PAGE LOADING...
$('body').append('<div style="font-size: 50px " id="loadingDiv"><div class="loader text-center">RUUSA & LISA <br>page loading...</div></div>');

$(window).on('load', function(){
    setTimeout(removeLoader, 1000); //wait for page load PLUS two seconds.
});
function removeLoader(){
    $( "#loadingDiv" ).fadeOut(100, function() {
        // fadeOut complete. Remove the loading div
        $( "#loadingDiv" ).remove();
    });
}





// GET MOVIE INFORMATION & PRINT TO CONSOLE & BROWSER
getMovies().then((movies) => {
  console.log('Here are all the movies:');
//1.creates table to hold movies; 2. inserts movies simultaneously.
  const resultHtml =
        $('<table id="listHere"><thead><tr><th id="id" scope="col">Movie ID</th><th id="title" scope="col">Title</th><th id="rating" scope="col">Rating</th></tr></thead><tr><td>e.g. 45</td><td>e.g. Gone with the Wind</td><td>e.g. 5</td></tr>');

    movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);//checks movies are being returned
    resultHtml.append(` 
                    <tbody><tr><td>${id}</td><td>${title}</td><td>${rating}</td></tr></tbody> `);
    resultHtml.append('</table>');//append to browser in new table
$('#insertHere').html(resultHtml);//target-div for new table

  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
window.onload = init;

//FORM MANIPULATION



//RATING SLIDER MANIPULATION

const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
};