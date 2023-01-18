// write your code here

//get the raman pictures and put in the ramen-menu div
fetch("http://localhost:3000/ramens")
.then(response => {
    if(response.ok) {
        return response.json();
    } else {
        throw("Error fetching from server");
    }
})
.then(data => {
    data.forEach(renderRamen);
    displayDetailedRamen(data[0]);
});

const newRamenForm = document.getElementById('new-ramen');
newRamenForm.addEventListener('submit', e => {
    e.preventDefault();

    const newRamen = {
        name: e.target.querySelector('#new-name').value,
        restaurant: e.target.querySelector('#new-restaurant').value,
        image: e.target.querySelector('#new-image').value,
        rating: e.target.querySelector('#new-rating').value,
        comment: e.target.querySelector('#new-comment').value
    };
    renderRamen(newRamen);
    e.target.reset();
})


//adds an image to the ramenMenu div with associated data
function renderRamen(ramenData) {
    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = ramenData.image;

    //store additional info about the ramen in data attributes to be used later
    img.dataset.name = ramenData.name;
    img.dataset.restaurant = ramenData.restaurant;
    img.dataset.comment = ramenData.comment;
    img.dataset.rating = ramenData.rating;
    img.addEventListener('click', onMenuClick);

    ramenMenu.append(img);
}

//populates the ramen-detail div
function onMenuClick(e) {
    const div = document.getElementById('ramen-detail');
    const img = div.querySelector('img');
    img.src = e.target.src;

    //name goes in h2
    const h2 = div.querySelector('h2');
    h2.textContent = e.target.dataset.name;

    //restaurant goes in h3
    const h3 = div.querySelector('h3');
    h3.textContent = e.target.dataset.restaurant;

    const ratingDisplay = document.getElementById('rating-display');
    ratingDisplay.textContent = e.target.dataset.rating;

    const commentDisplay = document.getElementById('comment-display');
    commentDisplay.textContent = e.target.dataset.comment;
}

function displayDetailedRamen(ramenData) {
    const div = document.getElementById('ramen-detail');
    const img = div.querySelector('img');
    img.src = ramenData.image;

    //name goes in h2
    const h2 = div.querySelector('h2');
    h2.textContent = ramenData.name;

    //restaurant goes in h3
    const h3 = div.querySelector('h3');
    h3.textContent = ramenData.restaurant;

    const ratingDisplay = document.getElementById('rating-display');
    ratingDisplay.textContent = ramenData.rating;

    const commentDisplay = document.getElementById('comment-display');
    commentDisplay.textContent = ramenData.comment;
}