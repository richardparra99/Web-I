module.exports = app => {
    require ("./usuario.routes")(app);
    require("./producto.routes")(app);
}