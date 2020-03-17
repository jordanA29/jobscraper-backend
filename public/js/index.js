$(document).ready(() => {
  /* Variables for search */
  const $queryTerm = $('#query');
  const $locationTerm = $('#location');
  const $scrapeButton = $('#scrapeButton');

  /* Variables for display area */
  const handleScrapeSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch(
        '/api/jobs?location=' +
          $locationTerm.val() +
          '&query=' +
          $queryTerm.val()
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  $scrapeButton.on('click', handleScrapeSubmit);
});
