require("express")()
    .use(require("express").static("./"))
    .listen(3000);
