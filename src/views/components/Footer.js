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

export default Footer;