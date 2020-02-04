"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const job_service_1 = require("../services/job.service");
const getJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield job_service_1.default();
        console.log(result);
        res.send(result);
        next();
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
});
exports.default = getJobs;
//# sourceMappingURL=job.controller.js.map