/**
 * es6 modules and imports
 */
const $ = require('jquery');
const {getMovies} = require('./api.js');

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

//FORM MANIPULATION

window.onload = init => {
    const submitButton = document.getElementById("submitButton");
    submitButton.onclick = updateForm;
}

//adds movies to existing list on browser
const updateForm = () =>{



    const table=document.getElementById("listHere");
    const row=table.insertRow(-1);
    const cell1=row.insertCell(0);
    const cell2=row.insertCell(1);
    const cell3=row.insertCell(2);
    cell1.innerHTML=id;
    cell2.innerHTML=title;
    cell3.innerHTML=rating;



}

//RATING SLIDER MANIPULATION

const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}