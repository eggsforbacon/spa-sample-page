import Header from "./views/components/Header";
import Footer from "./views/components/Footer";

/* Routing */

const routes = {
    '/': 'Home',
    '/about': 'About',
    '/p/:id': 'PostShow',
    '/register': 'Register'
};

const router = async () => {
    //Lazy load view elemtents
    const content = null || document.getElementById('page__container');
    const header = null || document.getElementById('header__container');
    const footer = null || document.getElementById('footer__container');

    //Render components in page (header and footer) <- no matter what url is requested, header and footer always render
    header.innerHTML = await Header.render();
    await Header.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();

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

//Listen load
window.addEventListener('load',router);
