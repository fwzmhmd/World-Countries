const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
        const countries = JSON.parse(xhr.responseText);
        let country = '';

        for (let i = 0; i < countries.length; i++) {
            const e = countries[i];

            const obj = e => {
                for(let prop in e){
                    return e[prop]
                }
            }

            country +=
            `<div class="country-card">
                            <div class="country-name">
                                <img src="https://flagcdn.com/28x21/${e.cca2.toLowerCase()}.png" alt="">
                                <div>${e.name.common}</div>
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
                                    <p>${e.capital}</p>
                                    <p>${obj(e.languages)}</p>
                                    <p>${e.region}</p>
                                    <p>${obj(obj(e.currencies))}</p>
                                    <p>${e.population}</p>
                                </div>
                            </div>
                            <a target="_blank" href="${e.maps.googleMaps}">
                                <button>Show on Google Maps</button>
                            </a>
                            
                        </div>
            `;
        }

        document.querySelector('.countries').innerHTML = country;
    }
}

xhr.open('GET', 'https://restcountries.com/v3.1/all');
xhr.send();