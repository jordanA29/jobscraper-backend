import * as cheerio from 'cheerio';
import axios from 'axios';

const url = 'https://www.indeed.fr/emplois?radius=50';

const scrapeJobOffers = async (location, query) => {
  const res = await axios.get(url, {
    params: {
      l: location,
      q: query,
    },
  });
  const $ = cheerio.load(res.data);

  const offerTable = $('#resultsCol');
  const offers = offerTable.find('.result');
  const results = Array.from(createObjects(filterOffers(offers, $), $));
  return results;
};

const filterOffers = (jobs: Array<Object>, $) => {
  const filtered = jobs.filter((_, index) => {
    const footer = $(index).find('.jobsearch-SerpJobCard-footer');
    const footerText: Array<String> = Array.from(
      footer.find('span').map((_, span) => $(span).text())
    );
    return !footerText.some((text) =>
      text.toLowerCase().includes('sponsorisée')
    );
  });
  return filtered;
};

const createObjects = (filtered: Array<Object>, $) => {
  const jobObjects = filtered.map((i, e) => {
    const job = $(e);

    const jobtitle = job.find('.jobtitle').text().trim();

    const summary = job.find('.summary').text().trim();

    const company = job.find('.company').text().trim() || null;

    const location = job.find('.location').text().trim();

    const postDate = job.find('.date').text().trim();

    const salary = job.find('.salary.no-wrap').text().trim();

    return {
      title: jobtitle,
      summary,
      url,
      company,
      location,
      postDate,
      salary,
    };
  });

  return jobObjects;
};

export default scrapeJobOffers;
