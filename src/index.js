/**
 * es6 modules and imports
 */
//code need to activate jquery
const $ = require('jquery');

//code imports movies from .api.js
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
        $('#loader').fadeIn(2000);
    }, 2000);
    setTimeout(removeLoader, 1000); //wait for page load PLUS two seconds.
});
function removeLoader(){
    $( "#loadingDiv" ).fadeOut(1000, function() {
        // fadeOut complete. Remove the loading div
        $( "#loadingDiv" ).remove();
    });
}

// GET MOVIE INFORMATION & PRINT TO CONSOLE & BROWSER

//calling movie list to load
loadMovies();

function loadMovies(){
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
    //1.creates table to hold movies; 2. inserts movies simultaneously.
        let resultHtml =
            $('<table id="listHere"><thead ><tr><th id="id" scope="col">Movie ID</th>' +
                '<th id="title" scope="col">Title</th><th id="rating" scope="col">Rating</th><th id="rating" scope="col">Edit/Delete</th></tr></thead><tr><td>e.g. 45</td><td>e.g. Gone with the Wind</td><td>e.g. 5</td><td>Edit/Delete</td></tr>');

        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);//checks movies are being returned
            resultHtml.append(` 
                        <tbody><tr><td>${id}</td><td>${title}</td><td>${rating}</td><td><button onclick="editRow();">Edit row</button><button onclick="deleteRow();">Delete row</button></td></tr></tbody> `);
            resultHtml.append('</table>');//append to browser in new table
            $('#insertHere').html(resultHtml);//target-div for new table

        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}


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


window.onload = init;

function init() {
    const submitButton = document.getElementById("submitButton");
    submitButton.onclick = getMovieData;
}

function getMovieData() {
    const title = document.getElementById("title");
    let newTitle = title.value;

    const rating = document.getElementById("rating");
    let newRating = parseInt(rating.value);

    let newMovie = {title: newTitle, rating: newRating};

    if (newTitle == null || newTitle === "") {
        alert("Please enter a movie title");

    } else {

        const movies = document.getElementById("movies");
        movies.innerHTML = "Added " + newMovie.title + " to the list.";

        const url = '/api/movies';
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
            // data: {search: search}
        }; //end of options

        fetch(url, options).then(
            function (){
                // Show image container
                $("#loader").show()
            }).then(function (response) {
                console.log(newMovie);
                loadMovies();
    

        }).then(function (data) {
                // Hide image container
                $("#loader").hide();
            }
        )


        // const theForm = document.getElementById("theForm");
        // theForm.reset();



}}
// RESET FORMS

