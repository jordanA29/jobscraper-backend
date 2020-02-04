"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const job_controller_1 = require("../controllers/job.controller");
const router = express_1.Router();
router.get('/', job_controller_1.default);
exports.default = router;
//# sourceMappingURL=job.routes.js.map