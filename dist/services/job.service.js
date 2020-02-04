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
const cheerio = require('cheerio');
const axios = require('axios');
const url = 'https://www.indeed.fr/emplois?q=full-stack+developer&l=Nantes&radius=50';
const scrapeJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.get(url);
    const $ = cheerio.load(res.data);
    const results = [];
    const jobTable = $('#resultsCol');
    const jobs = jobTable.find('.result');
    //   console.log('JOBS', jobs);
    filterJobs(jobs, $);
    $('div.title').each((idx, element) => {
        const title = $(element)
            .children('a')
            .attr('title');
        results.push(title);
    });
    return results;
});
// filter
// condition of returned array --> sponsirisee is not found
// 1 get sponsorisee text from job list
const filterJobs = (jobs, $) => {
    const filtered = jobs.filter((_, index) => {
        const footer = $(index).find('.jobsearch-SerpJobCard-footer');
        const footerText = Array.from(footer.find('span').map((_, span) => $(span).text()));
        return !footerText.some(text => text.toLowerCase().includes('sponsorisée'));
    });
    console.log(filtered);
};
// const filtered = excludeSponsored
// ? jobs.filter((_, e) => {
//     const job = $(e);
//     const footer = job.find('.jobsearch-SerpJobCard-footer');
//     const spanText = Array.from(
//       footer.find('span').map((_, span) => $(span).text())
//     );
//     const isSponsered = spanText.some(text =>
//       text.toLowerCase().includes('sponsored')
//     );
//     return !isSponsered;
//   })
// : jobs;
// // Create objects
// const jobObjects = filtered.map((i, e) => {
// const job = $(e);
// const jobtitle = job.find('.jobtitle').text().trim();
// const url = 'https://' + host + job.find('.jobtitle').attr('href');
// const summary = job.find('.summary').text().trim();
// const company = job.find('.company').text().trim() || null;
// const location = job.find('.location').text().trim();
// const postDate = job.find('.date').text().trim();
// const salary = job.find('.salary.no-wrap').text().trim();
// return {
//   title: jobtitle,
//   summary: summary,
//   url: url,
//   company: company,
//   location: location,
//   postDate: postDate,
//   salary: salary
// };
exports.default = scrapeJobs;
//# sourceMappingURL=job.service.js.map