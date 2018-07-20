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
$('body').append('<div style="font-size: 50px " id="loadingDiv"><div class="loader text-center"></div></div>');

$(window).on('load', function(){

    setTimeout(function(){
        $('#greetHide').fadeIn(2000);
    }, 2000);
    setTimeout(removeLoader, 1000); //wait for page load PLUS two seconds.
});
function removeLoader(){
    $( "#loadingDiv" ).fadeOut(1000, function() {
        // fadeOut complete. Remove the loading div
        $( "#loadingDiv" ).remove();
    });
}

//INITIAL AJAX


// GET MOVIE INFORMATION & PRINT TO CONSOLE & BROWSER
getMovies().then((movies) => {
    console.log('Here are all the movies:');
//1.creates table to hold movies; 2. inserts movies simultaneously.
    const resultHtml =
        $('<table id="listHere"><thead ><tr><th id="id" scope="col">Movie ID</th><th id="title" scope="col">Title</th><th id="rating" scope="col">Rating</th><th id="rating" scope="col">Edit/Delete</th></tr></thead><tr><td>e.g. 45</td><td>e.g. Gone with the Wind</td><td>e.g. 5</td><td><button onclick="deleteRow();">Delete row</button></td></tr>');

    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);//checks movies are being returned
        resultHtml.append(` 
                    <tbody><tr><td>${id}</td><td>${title}</td><td>${rating}</td><td><button onclick="deleteRow();">Delete row</button></td></tr></tbody> `);
        resultHtml.append('</table>');//append to browser in new table
        $('#insertHere').html(resultHtml);//target-div for new table

    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

$("#submitButton").click(function(){
    const search = $('#listHere').val();

    $.ajax({
        url: '/api/movies',
        type: 'post',
        data: {
            title: $(`title`).val(),
            rating: $(`rating`).val(),
        },
        beforeSend: function(){
            // Show image container
            $("#loader").show();
        },
        success: function(response){
            $('.response').empty();
            $('#listHere').append(response);
        },
        complete:function(data){
            // Hide image container
            $("#loader").hide();
        }
    });
})

//RATING SLIDER MANIPULATION

const slider = document.getElementById("rating");
const output = document.getElementById("ratingNum");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}



//RESET MOVIE TITLE & RATING SLIDER







//adding movies to list

function Movie(title, rating) {
    this.title = title;
    this.rating = rating;

}

const movieList = [];

window.onload = init;

function init() {
    const submitButton = document.getElementById("submitButton");
    submitButton.onclick = getMovieData;
}

function getMovieData() {
    const titleInput = document.getElementById("title");
    const title = titleInput.value;

    const ratingInput = document.getElementById("rating");
    const rating = parseInt(ratingInput.value);



    if (title == null || title == "") {
        alert("Please enter a movie title");
        return;
    }
    else {
        const movie = new Movie(title, rating);
        movieList.push(movie);
        const movies = document.getElementById("movies");
        movies.innerHTML = "Added " + movie.title + " to the list.";

        const theForm = document.getElementById("theForm");
        theForm.reset();
    }
}
// RESET FORMS