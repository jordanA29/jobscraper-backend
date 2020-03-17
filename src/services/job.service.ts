const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://www.indeed.fr/emplois?radius=50';

const scrapeJobs = async (location, query) => {
  const res = await axios.get(url, {
    params: {
      l: location,
      q: query
    }
  });
  const $ = cheerio.load(res.data);

  const jobTable = $('#resultsCol');
  const jobs = jobTable.find('.result');
  const results = Array.from(createObjects(filterJobs(jobs, $), $));
  return results;
};

const filterJobs = (jobs: Array<Object>, $) => {
  const filtered = jobs.filter((_, index) => {
    const footer = $(index).find('.jobsearch-SerpJobCard-footer');
    const footerText: Array<String> = Array.from(
      footer.find('span').map((_, span) => $(span).text())
    );
    return !footerText.some(text => text.toLowerCase().includes('sponsorisée'));
  });
  return filtered;
};

const createObjects = (filtered: Array<Object>, $) => {
  const jobObjects = filtered.map((i, e) => {
    const job = $(e);

    const jobtitle = job
      .find('.jobtitle')
      .text()
      .trim();

    const summary = job
      .find('.summary')
      .text()
      .trim();

    const company =
      job
        .find('.company')
        .text()
        .trim() || null;

    const location = job
      .find('.location')
      .text()
      .trim();

    const postDate = job
      .find('.date')
      .text()
      .trim();

    const salary = job
      .find('.salary.no-wrap')
      .text()
      .trim();

    return {
      title: jobtitle,
      summary: summary,
      url: url,
      company: company,
      location: location,
      postDate: postDate,
      salary: salary
    };
  });

  return jobObjects;
};

export default scrapeJobs;
