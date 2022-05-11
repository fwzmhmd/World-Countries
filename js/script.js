const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const allCountries = JSON.parse(xhr.responseText);
    let countryDiv = '';

    allCountries.forEach(c => {
      const country = c;

      const obj = e => {
        for (let prop in e) {
          return e[prop];
        }
      };

      const {
        cca2,
        name: { common },
        capital,
        region,
        population,
        maps: { googleMaps }
      } = country;

      countryDiv += `
        <div class="country-card">
            <div class="country-name">
                <img src="https://flagcdn.com/28x21/${cca2.toLowerCase()}.png" alt="">
                <div>${common}</div>
            </div>
            <div class="country-info">
                <div class="title">
                    <p>Capital:</p>
                    <p>Language: </p>
                    <p>Continent: </p>
                    <p>Currency: </p>
                    <p>Population:</p>
                </div>
                <div class="content">
                    <p>${capital}</p>
                    <p>${obj(country.languages)}</p>
                    <p>${region}</p>
                    <p>${obj(obj(country.currencies))}</p>
                    <p>${population}</p>
                </div>
            </div>
            <a target="_blank" href="${googleMaps}">
                <button>Show on Google Maps</button>
            </a>
        </div>
        `;
    });

    document.querySelector('.countries').innerHTML = countryDiv;
  }
};

xhr.open('GET', 'https://restcountries.com/v3.1/all');
xhr.send();
