"use strict";

let parseRequestURL = () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/");

    let request = {
        resource: null,
        id: null,
        verb: null
    }

    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
}

let OnRegister = () => {
    console.log("ayo");
    alert("ayo");
}

let Header = {
    render : async () => {
        let view = /*html*/`
        <header class="header">
            <div class="header__content has-text-centered">
                <p>This is a header, we could make it useful. We won't</p>
            </div>
        </header>
        `

        return view;
    },

    after_render : async () => {/* Put events in here */}
}

let Footer = {
    render : async () => {
        let view = /*html*/`
        <footer class="footer">
            <div class="footer__content has-text-centered">
                <p>This is a footer, we could make it prettier. We won't</p>
            </div>
        </footer>
        `

        return view;
    },

    after_render : async () => {/* Put events in here */}
}

let Bottombar = {
    render: async () => {
        let view =  /*html*/`
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    This is my foot. There are many like it, but this one is mine.
                </p>
            </div>
        </footer>
        `
        return view
    },
    after_render: async () => { }

}

let Navbar = {
    render: async () => {
        let view =  /*html*/`
             <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/#/">
                            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                        </a>
                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                        <div class="navbar-start">
                            <a class="navbar-item" href="/#/">
                                Home
                            </a>
                            <a class="navbar-item" href="/#/about">
                                About
                            </a>
                            <a class="navbar-item" href="/#/secret">
                                Secret
                            </a>
                        </div>
                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <a class="button is-primary" href="/#/register">
                                        <strong>Sign up</strong>
                                    </a>
                                    <a class="button is-light">
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `
        return view
    },
    after_render: async () => { }

}

let About = {
    render : async () => {
        let view = /*html*/`
            <section class="section">
                <h1>About</h1>
                <p>This is the about page</p>
                <button id ="header__btn-register">Button</button>
            </section>
        `

        return view;
    },

    after_render : async () => {
        document.getElementById('header__btn-register').addEventListener("click", OnRegister());
    }
}

let Error404 = {

    render : async () => {
        let view =  /*html*/`
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }
}
let getPost = async (id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`https://5bb634f6695f8d001496c082.mockapi.io/api/posts/` + id, options)
       const json = await response.json();
       // console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let PostShow = {

    render : async () => {
        let request = Utils.parseRequestURL()
        let post = await getPost(request.id)
        
        return /*html*/`
            <section class="section">
                <h1> Post Id : ${post.id}</h1>
                <p> Post Title : ${post.title} </p>
                <p> Post Content : ${post.content} </p>
                <p> Post Author : ${post.name} </p>
            </section>
        `
    }
    , after_render: async () => {
    }
}

let getPostsList = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`https://5bb634f6695f8d001496c082.mockapi.io/api/posts`, options)
       const json = await response.json();
       // console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let Home = {
   render : async () => {
       let posts = await getPostsList()
       let view =  /*html*/`
           <section class="section">
               <h1> Home </h1>
               <ul>
                   ${ posts.map(post => 
                       /*html*/`<li><a href="#/p/${post.id}">${post.title}</a></li>`
                       ).join('\n ')
                   }
               </ul>
           </section>
       `
       return view
   }
   , after_render: async () => {
   }

}


let Register = {

    render: async () => {
        return /*html*/ `
            <section class="section">
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" id="email_input" type="email" placeholder="Enter your Email">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" id="pass_input" type="password" placeholder="Enter a Password">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" id="repeat_pass_input" type="password" placeholder="Enter the same Password again">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary" id="register_submit_btn">
                        Register
                        </button>
                    </p>
                </div>
            </section>
        `
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {
        document.getElementById("register_submit_btn").addEventListener ("click",  () => {
            let email       = document.getElementById("email_input");
            let pass        = document.getElementById("pass_input");
            let repeatPass  = document.getElementById("repeat_pass_input");
            if (pass.value != repeatPass.value) {
                alert (`The passwords dont match`)
            } else if (email.value =='' | pass.value == '' | repeatPass == '') {
                alert (`The fields cannot be empty`)
            } 
            else {
                alert(`User with email ${email.value} was successfully submitted!`)
            }    
        })
    }
}

/* Routing */
const routes = {
    '/': Home,
    '/about': About,
    '/p/:id': PostShow,
    '/register': Register
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
    let request = parseRequestURL();

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
