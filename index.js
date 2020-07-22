let countries = document.querySelector('.names');
let search = document.querySelector('.search');
let input = document.querySelector('#input');
let api = "https://restcountries.eu/rest/v2/all";
let acountry = document.createElement('div');

console.log(acountry);
let output = function (element) {
    
    let content =  `
    <div class="item">
        <div>
            <img src=${element.flag} >
        </div>
        <div class= "item__content">
            <p><strong>Name:</strong> ${element.name}</p>
            <p><strong>Capital:</strong> ${element.capital}</p>
            <p><strong>Population:</strong> ${element.population}</p>
        <div>
    </div>
        `        
    acountry.append(content);
    console.log(acountry)
    return content;

}


function findCountry(element) {
    if (element.name == input.value) {
        console.log(element);
        countries.innerHTML = output(element)
    }
}
// function getData() {

    fetch(api)
    .then(status)
        .then(response => {
            data = response.json();
            return data;
        })
    
        .then(data => {
            
            input.addEventListener('input', () => {
                
                data.forEach(element => {
                    let regex = new RegExp('^' + input.value, 'i');
                    let name = element.name;
                    
                    if (regex.test(name)) {
                        countries.insertAdjacentHTML('afterbegin', output(element))
                     }// else {
                         //     // countries.insertAdjacentHTML('afterbegin', output1(element)) 
                         //     output(element).remove()
                         // }
                        })
                    })
                    
                    search.addEventListener('click', (event) => {
                        event.preventDefault()
                        data.forEach(element => { 
                    findCountry(element) 
                });
            });
            
            data.forEach(element => {
                countries.insertAdjacentHTML('afterbegin', output(element))
            });
    
        })
    
        .catch(error => {
            console.log(error);
        })
// }

// getData()






// api = `https://restcountries.eu/rest/v2/name/${regex.test(name)}`;

// fetch(api)
//         .then(status)
//         .then(response => {
//             data = response.json();
//             return data;
//         })

//         .then(data => {
//             data.forEach(element => {
//                 countries.insertAdjacentHTML('afterbegin', output(element))
//             });
//     })