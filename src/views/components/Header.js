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

export default Header;