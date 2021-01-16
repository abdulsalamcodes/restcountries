let countries = document.querySelector('.countries');
let select_region = document.querySelector('#region ');
let input = document.querySelector('#input');
let api = "https://restcountries.eu/rest/v2/all";
let modal = document.querySelector(".modal");
let modalWrapper = document.querySelector(".modal__wrapper");
let back = document.querySelector(".back");
let borderWrapper = document.querySelector(".border__names");

// Helper Function
const showModal = (item) => {
    createModalContent(item)
    modal.classList.add("showModal")
}

// Close Modal
back.addEventListener("click", () => {
    modal.classList.remove("showModal");
})


// Handle Country listing
const populateData = (data) => {
    data.map(item => {
        // Reusable Component
        let title = (text) => document.createElement("strong").textContent = text

        let countryBox = document.createElement("div");
        countryBox.classList.add("country__box");

        let image = document.createElement("img");
        image.src = item.flag;
        countryBox.appendChild(image);

        let countryName = document.createElement('h3');
        countryName.textContent = item.name;
        countryName.className = "country__name";
        countryBox.appendChild(countryName);


        let countryDetail = document.createElement("div");
        countryDetail.classList.add("country__detail");
        countryBox.appendChild(countryDetail);

        let population = document.createElement("p");
        population.textContent = title("Population") + ": " + item.population;
        countryDetail.appendChild(population);

        let Region = document.createElement("p");
        Region.textContent = title("Region") + ": " + item.region;
        countryDetail.appendChild(Region);

        let Capital = document.createElement("p");
        Capital.textContent = title("Capital") + ": " + item.capital;
        countryDetail.appendChild(Capital);

        countryBox.addEventListener("click", () => showModal(item))
        countries.appendChild(countryBox)
    })
}

// Handle Modal Content
const createModalContent = (item) => {
    let image = document.querySelector(".modal__image");
    image.src = item.flag;

    let title = document.querySelector("#title");
    title.textContent = item.name;

    let nativeName = document.querySelector("#native_name");
    nativeName.textContent = item.nativeName;

    let population = document.querySelector("#population");
    population.textContent = item.population;
    let sub_region = document.querySelector("#sub_region");
    sub_region.textContent = item.subregion;
    let capital = document.querySelector("#capital");
    capital.textContent = item.capital;
    let top_level_domain = document.querySelector("#top_level_domain");
    top_level_domain.textContent = item.topLevelDomain;

    let currenciesCodes = item.currencies.map(currency => currency.code);
    document.querySelector("#currencies").textContent = currenciesCodes.join(",")

    let languagesName = item.languages.map(language => language.name);
    document.querySelector("#languages").textContent = languagesName.join(',');

    // clear border first
    borderWrapper.innerHTML = "";

    item.borders.map(border => {

        let borderButton = document.createElement("button");
        borderButton.addEventListener("click", () => handleBorderModal(border))
        borderButton.textContent = border;
        borderWrapper.appendChild(borderButton);
    })

    // return wrapper;
}


const handleBorderModal = (code) => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(response => response.json())
        .then(data => {
            borderWrapper.innerHTML = "";
            showModal(data);
        })
}

let ThemeSwitcher = document.querySelector("#theme__switcher");

ThemeSwitcher.addEventListener("click", () => {
    if (document.documentElement.getAttribute('data-theme') !== "dark") {
        document.documentElement.setAttribute('data-theme', "dark");
    } else {
        document.documentElement.setAttribute('data-theme', "light");
    }
})

fetch(api)
    .then(response => {
        return response.json();
    })
    .then(data => {
        // Initialize
        populateData(data);

        // Filter Based on Input
        input.addEventListener("input", (e) => {
            var newData = data.filter(item => {
                return (item.name.toLowerCase().includes(e.target.value.toLowerCase())) ? item : null
            })
            countries.innerHTML = "";
            populateData(newData)
        })


        // Filter based on selected Option.
        select_region.addEventListener("change", e => {
            if (e.target.value.toLowerCase() == "all") {
                console.log("hey")
                populateData(data);
                return;
            };
            let newData = [...data].filter(item => {
                return (item.region.toLowerCase() === e.target.value.toLowerCase() ? item : null)
            })

            countries.innerHTML = "";
            populateData(newData)
        })


    })

    .catch(error => {
        console.log(error);
    })


