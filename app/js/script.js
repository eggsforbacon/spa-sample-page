/* Routing */

const routes = {
    '/': 'Home',
    '/about': 'About',
    '/p/:id': 'PostShow',
    '/register': 'Register'
};

const router = async () => {
    //Lazy load
    const content = null || document.getElementById('page_container');
    // get the url with the split '/'
    let request = Utils.parseRequestURL();

    // Parse the URL - we fill the url according to split
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    //With the parsedURL we ask if the route exist, if no exist launch 404 page
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;

    // await is to manipulate sync
    content.innerHTML = await page.render();
    await page.after_render();
}

// Listen on hash change #, we pass the function to launch
window.addEventListener('hashchange',router);

//Liste load
window.addEventListener('load',router);