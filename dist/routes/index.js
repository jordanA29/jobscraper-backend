"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const job_routes_1 = require("./job.routes");
const router = express_1.Router();
router.use('/jobs', job_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map