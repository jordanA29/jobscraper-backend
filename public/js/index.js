$(document).ready(() => {
  /* Variables for search */
  const $queryTerm = $('#query');
  const $locationTerm = $('#location');
  const $scrapeButton = $('#scrapeButton');
  const $saveButton = $('#saveButton');

  /**   
  title: String;
  summary?: String;
  company?: String;
  postDate?: String;
  location: String;
  salary?: String;
  websiteFrom
   */
  let scrapedOffers = [];
  /* Variables for display area */

  $resultArea = $('#resultArea');
  const handleScrapeSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch(
        '/api/scrape?location=' +
          $locationTerm.val() +
          '&query=' +
          $queryTerm.val()
      );
      const data = await response.json();
      this.scrapedOffers = data;
      displayOffers(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSaveSubmit = async event => {
    event.preventDefault();

    try {
      $.each(this.scrapedOffers, async (i, offer) => {
        const rawResponse = await fetch('/api/jobs', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(offer)
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const displayOffers = data => {
    $.each(data, (i, el) => {
      $resultArea.append('<p>' + el.title + '</p>');
    });
  };

  $scrapeButton.on('click', handleScrapeSubmit);
  $saveButton.on('click', handleSaveSubmit);
});
