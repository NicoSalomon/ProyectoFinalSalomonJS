document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-list');
    const cartItemsContainer = document.getElementById('cart-items');
    
    const apiKey = 'f258bb1e6010a0d086b7dfeaf5e2158f';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es`;

    
    const moviesArray = [];
    const cartArray = [];


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;


            moviesArray.push(...movies);

            displayMovies(moviesArray);
        })
        .catch(error => {
            console.error('Error al obtener datos de la API de películas:', error);
        });

    function displayMovies(movies) {
        
        movies.forEach(movie => {
            const movieElement = createMovieElement(movie);
            movieList.appendChild(movieElement);
        });
    }

    function createMovieElement(movie) {
        
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

       
        movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
            <p>Puntuación: ${movie.vote_average}</p>
            <button class="addToCartBtn" data-id="${movie.id}">Agregar al carrito</button>
        `;


        const addToCartBtn = movieElement.querySelector('.addToCartBtn');
        addToCartBtn.addEventListener('click', () => addToCart(movie.id));

        return movieElement;
    }

    function addToCart(movieId) {
        
        const selectedMovie = moviesArray.find(movie => movie.id === movieId);
    
        
        const existingCartItem = cartArray.find(item => item.id === movieId);
    
        if (existingCartItem) {
            
            existingCartItem.quantity += 1;
        } else {
            
            selectedMovie.quantity = 1;
            cartArray.push(selectedMovie);
        }
    
       
        updateCartUI();
    
        alert('Película agregada al carrito');
    }
    

    function updateCartUI() {

        cartItemsContainer.innerHTML = '';
    

        cartArray.forEach(movie => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <strong>${movie.title}</strong>
                <br>
                Puntuación: ${movie.vote_average}
                <br>
                Cantidad: ${movie.quantity}
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    
});
