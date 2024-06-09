(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
    
})(jQuery);

// Search Functionality
const movies = [
    {
        title: "Aquaman: The Lost Kingdom",
        year: "2024",
        image: "image/aquaman.jpg",
        link: "proj100.html"
    },
    {
        title: "What You Wish For",
        year: "2024",
        image: "what-you-wish-for-hollywood-movie.jpg",
        link: "proj101.html"
    },
    {
        title: "Poolman",
        year: "2024",
        image: "poolman-hollywood-movie.jpg",
        link: "proj102.html"
    },
    {
        title: "Die Hart 2",
        year: "2024",
        image: "die-hart-2-hollywood-movie.jpg",
        link: "proj103.html"
    },
    {
        title: "Not Another Church Movie",
        year: "2024",
        image: "not-another-church-movie-hollywood-movie.jpg",
        link: "proj104.html"
    },
    // Add more movies here
];

let typingTimer;                // Timer identifier
const typingInterval = 500;     // Time in ms (0.5 seconds)
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('autocomplete-results');
const loadingSpinner = document.getElementById('loading-spinner');

function searchMovies() {
    const input = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = '';

    if (input === '') {
        resultsContainer.style.display = 'none';
        loadingSpinner.style.display = 'none';
        return;
    }

    loadingSpinner.style.display = 'block';

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        const results = movies.filter(movie => movie.title.toLowerCase().includes(input));
        
        if (results.length > 0) {
            results.forEach(movie => {
                const template = document.getElementById('autocomplete-template').content.cloneNode(true);
                template.querySelector('a').href = movie.link;
                template.querySelector('img').src = movie.image;
                template.querySelector('.word').textContent = movie.title;
                template.querySelector('.year').textContent = movie.year;
                resultsContainer.appendChild(template);
            });
        } else {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.classList.add('autocomplete-item');
            noResultsMessage.textContent = 'No results found!!!';
            resultsContainer.appendChild(noResultsMessage);
        }

        resultsContainer.style.display = 'block';
        loadingSpinner.style.display = 'none';
    }, typingInterval);
}

searchInput.addEventListener('input', () => {
    loadingSpinner.style.display = 'block';
    clearTimeout(typingTimer);
    typingTimer = setTimeout(searchMovies, typingInterval);
});

searchInput.addEventListener('focus', () => {
    if (resultsContainer.children.length > 0) {
        resultsContainer.style.display = 'block';
    }
});

document.addEventListener('click', (e) => {
    if (!document.querySelector('.modal-content').contains(e.target)) {
        resultsContainer.style.display = 'none';
    }
});
