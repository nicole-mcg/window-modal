
afterEach(() => {
    while (document.body.hasChildNodes()) {
        document.body.removeChild(document.body.children[0]);
    }
});
