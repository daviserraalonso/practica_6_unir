var express = require("express");
var path = require("path");
var app = express();
var distFolder = path.join(process.cwd(), 'front-end/dist/front-end/browser');

// Sirve archivos estáticos desde la carpeta dist
app.use(express.static(distFolder));

// Este middleware debe manejar cualquier ruta no reconocida
app.get('*', function (req, res) {
    res.sendFile(path.join(distFolder, 'index.html'));  // Sirve index.html para todas las rutas no reconocidas
});

var port = process.env['PORT'] || 4000;
app.listen(port, function () {
    console.log("Servidor escuchando en http://localhost:" + port);
});
