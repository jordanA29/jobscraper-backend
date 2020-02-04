"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./routes");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', routes_1.default);
app.listen(PORT, () => {
    console.log('App listening on port', PORT);
});
//# sourceMappingURL=server.js.map