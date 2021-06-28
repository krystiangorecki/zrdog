// 'use strict';

var r = decodeURIComponent('%72%6f%6b%73%61%2e%70%6c');
var g = decodeURIComponent('%77%77%77%2e%67%61%72%73%6f%6e%69%65%72%61%2e%63%6f%6d%2e%70%6c');
var hm = decodeURIComponent('%77%77%77%2e%68%6f%74%6d%61%78%2e%70%6c');
var e = decodeURIComponent('%65%72%6f%6d%65%74%72%2e%70%6c');

var autosearch = 1;

function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function applyDynamicTarget() {
	chrome.storage.sync.get(['openInNewTab'], function (result) {
		// alert('Value currently is ' + result.openInNewTab);
		var openInNewTab = result.openInNewTab;
		const links = Array.prototype.slice.apply(document.querySelectorAll('a.dynamicTarget'));
		for (var i = 0; i < links.length; i++) {
			if (openInNewTab) {
				links[i].target = "_blank";
			}
		}
	});
}

// adds g link on r
function executeRdoG() {
	// get element with phone number
	var phoneElement = document.querySelector('#anons_details span.dane_anonsu_tel');
	// get number text from element
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	// create URL to search for a phone number with dashes
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone.split(' ').join('-') + '"';

	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="#" class="linkDoG dynamicTarget" > g </a>';
	newLink.addEventListener("click", function (data) {
		window.open(url);
	});

	// get element "Kontakt"...
	var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
	// ... insert new link after it
	insertAfter(contactElement, newLink);
}

// adds g link on r by ad number
function executeRdoGByAdNumber() {
	var pathname = window.location.pathname;
	var adNumber = pathname.substring(pathname.lastIndexOf('/')+1);
	//alert(adNumber);

	// create URL to search for a phone number with dashes
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q=' + adNumber;

	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="#" class="linkDoG dynamicTarget" > g2 </a>';
	newLink.addEventListener("click", function (data) {
		window.open(url);
	});

	// get element "Kontakt"...
	var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
	// ... insert new link after it
	insertAfter(contactElement, newLink);
}

// adds link to g on o
function executeOdoG() {
	// get element with phone number
	var phoneElement = document.querySelector('h3.contactNumber');
	// get number text from element
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	// create URL to search for a phone number with dashes
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone.split(' ').join('-') + '"';
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="#" class="linkDoG dynamicTarget" > g </a>';
	newLink.addEventListener("click", function (data) {
		window.open(url);
	});

	// inserts link after phone number
	insertAfter(phoneElement, newLink);
}

// adds link to g on hm
function executeHMdoG() {
	// get element with phone number
	var phoneElement = document.querySelector('div.anons_telefon');
	// get number text from element
	var phone = phoneElement.textContent.replace('tel.','').trim();
	//alert(phone);

	// create URL to search for a phone number with dashes
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone.split(' ').join('-') + '"';
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="#" class="linkDoG dynamicTarget" > g </a>';
	newLink.addEventListener("click", function (data) {
		window.open(url);
	});

	// inserts link after phone number
	insertAfter(phoneElement, newLink);
}
// adds links to r on r to allow searching for more ads with the same phone number
function executeRdoR() {
	var phoneElement = document.querySelector('#anons_details span.dane_anonsu_tel');
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' + phone.split(' ').join('').split('-').join('') + "&key_word=#show";
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > r </a>';
	// get element "Kontakt"...
	var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
	// ... insert new link after it
	insertAfter(contactElement, newLink);
}

// adds link to e on r to allow searching for reviews for the same phone number
function executeRdoE() {
	chrome.storage.sync.get(['showElink'], function (result) {
		// alert('showElink is ' + result.showElink);
		var showElink = result.showElink;
		if (showElink) {
			var phoneElement = document.querySelector('#anons_details span.dane_anonsu_tel');
			var phone = phoneElement.textContent.trim();
			//alert(phone);
			var url = 'https://' + e + '/szukaj?q=%22' + phone.split(' ').join('-') + "%22";
			var newLink = document.createElement("span");
			newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > e </a>';
			// get element "Kontakt"...
			var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
			// ... insert new link after it
			insertAfter(contactElement, newLink);
		}
	});
}

// adds links to r on o
function executeOdoR() {
	var phoneElement = document.querySelector('h3.contactNumber');
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' +  phone.split(' ').join('').split('-').join('')  + "&key_word=#show";
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > r </a>';

	insertAfter(phoneElement, newLink);
}

// adds links to r on hm
function executeHMdoR() {
	var phoneElement = document.querySelector('div.anons_telefon');
	var phone = phoneElement.textContent.replace('tel.','').trim();
	//alert(phone);

	var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' + phone.split(' ').join('').split('-').join('') + "&key_word=#show";
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > r </a>';

	insertAfter(phoneElement, newLink);
}

// adds links to r on e
function executeEdoR() {
	var phoneElements = document.querySelectorAll('a[name=escort-phones] ~ ul>li>a');
	for(var i = 0 ; i < phoneElements.length ; i++){
		var phone = phoneElements[i].textContent.trim();
		//alert(phone);

		var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' + phone.split(' ').join('').split('-').join('') + "&key_word=#show";
		var newLink = document.createElement("span");
		newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > r </a>';

		insertAfter(phoneElements[i], newLink);
	}
}

// adds buttons on r and o
function addButtonsForRiO() {
	if (window.location.hostname.indexOf(r) != -1) {
		// add link to r (other ads for the same number)
		executeRdoR();
		// add link to e
		executeRdoE();
		// add link to g by ad number
		executeRdoGByAdNumber();
		// add link to g
		executeRdoG();
	} else if (window.location.hostname.indexOf(hm) != -1) {
		// add links only if not on main page
		// required because of URL scheme, everything has URL like /abc
		if(!document.documentURI.endsWith('.pl/#')){
			// I'm on hm
			// add link to g
			executeHMdoG();
			// add link to r
			executeHMdoR();
		}
	} else if (window.location.hostname.indexOf(e) != -1) {
		// I'm on e
		// add link to r
		executeEdoR();
	} else {
		// I'm on o
		// add link to r
		executeOdoR();
		// add link to g
		executeOdoG();
	}
	applyDynamicTarget();
}

//--------------
// r and o part above
// g alternative search part below
//--------------

var tries = 0;
var searchResultsLoaded = false;

// called when search was performed too often and certain number of seconds have already passed
function searchAgainAfterWaiting() {
	document.querySelector('input[name="submit"]').click();
}

function checkIfSearchResultsLoaded() {
	tries++;
	var element = document.querySelector("div.gsc-result");
	// alert('try number ' + tries + ' element = ' + element);
	searchResultsLoaded = element != null;
	// alert('searchResultsLoaded? ' + searchResultsLoaded);
	if (!searchResultsLoaded) {
		// two possible reasons here:
		// 1 antiflood protection - have to wait x seconds
		// 2 too early check - page not fully loaded

		// check if search protection is present
		var protection = document.querySelector('#middle_column p.message.error');
		if (protection != null && protection.textContent.indexOf('odczekać') != -1) {
			var timeToWait = protection.textContent.replace(/\D/g, '');
			setTimeout(searchAgainAfterWaiting, timeToWait * 1100);
		} else if (tries < 10) {
			// give page some time to load and try again
			setTimeout(checkIfSearchResultsLoaded, 500);
		}
	} else {
		continueExecution();
	}
}

function continueExecution() {
	// is message "Brak wyników" visible
	var noResults = document.querySelector("div.gs-snippet");
	// alert('noResults ' + noResults);
	if (noResults != null) {
		addSearchForumButton();
	}
}

function prepareSearch() {
	var number = document.querySelector("#gsc-i-id1").value;
	document.querySelector('#main_search').value = number;
	document.querySelector('#search_options').click();
	document.querySelector('label[title="Forum"]').click();
}

function doSearch() {
	document.querySelector('#search-box').submit();
}
function updateCounterAndAutoclickButton(searchButton, counter, time) {
	if (time > 1) {
		counter.text = time - 1;
		setTimeout(updateCounterAndAutoclickButton, 1000, searchButton, counter, time - 1);
	} else {
		searchButton.click();
	}
}

// when no results adds button for manual search
function addSearchForumButton() {
	// alert('adding button');
	var destinationElement = document.querySelector(".gsc-resultsRoot");
	var searchButton = document.createElement("a");
	searchButton.setAttribute('href', '#');
	prepareSearch();
	searchButton.addEventListener("click", doSearch);
	searchButton.setAttribute('style', ' margin-left:20px; background-color: white;  color: black;  text-color: black;  border: 2px solid red;  padding: 1px 2px;  text-align: center;  text-decoration: none;  display: inline-block;');
	searchButton.text = ' szukaj bezpośrednio na Forum';
	insertBefore(destinationElement, searchButton);

	// add countdown to autosearch
	if (autosearch == 1) {
		var time = 4;
		var counter = document.createElement("a");
		counter.text = time;
		counter.setAttribute('style', ' margin-left:10px;');
		insertAfter(searchButton, counter);
		updateCounterAndAutoclickButton(searchButton, counter, time);
	}
}


//--------------- FILTERING LINKS
	
function addCityLink() {
    var cityElement = getLabelElement("Miasto", ".dane_anonsu_fiolet");
    cityElement.outerHTML = '<a href="https://www.' + r + '/pl/anonse/wszystkie/' + cityElement.innerText + '" ><span class="dane_anonsu_fiolet dane_anonsu_tytul">' + cityElement.innerText + '</span> </a>';
}

function addPriceLink() {
    var valueElement = getLabelElement("1 godz", ".dane_anonsu_tytul:nth-child(2)");
    var cena = valueElement.innerText.match(/(\d+)/gi)[0];
    addLinkForLabel(valueElement, cena, 0, 0, 0, "dane_anonsu_fiolet dane_anonsu_tytul");
}

function addAgeLink() {
    var valueElement = getLabelElement("Wiek", ".dane_anonsu_value");
    var wiek = valueElement.innerText.match(/(\d+)/gi)[0];
    addLinkForLabel(valueElement, 0, wiek, 0, 0, "dane_anonsu_value");
}

function addWeightLink() {
    var valueElement = getLabelElement("Waga", ".dane_anonsu_value");
    var waga = valueElement.innerText.match(/(\d+)/gi)[0];
    addLinkForLabel(valueElement, 0, 0, waga, 0, "dane_anonsu_value");
}

function addHeightLink() {
    var valueElement = getLabelElement("Wzrost", ".dane_anonsu_value");
    var wzrost = valueElement.innerText.match(/(\d+)/gi)[0];
    addLinkForLabel(valueElement, 0, 0, 0, wzrost, "dane_anonsu_value");
}

function addLinkForLabel(valueElement, cena, wiek, waga, wzrost, linkClass){
    var city = getLabelElement("Miasto", ".dane_anonsu_fiolet").innerText;
	var state = getStateForCity(city);
    valueElement.outerHTML = '<a href="https://www.' + r + '/pl/szukaj/?anons_type=a&anons_category=0&anons_city%5B%5D=' + city + '&anons_state=' + state + '&cenaod=' + cena + '&cenado=' + cena + '&cenapoldo=0&cena15do=0&cenanocod=0&cenanocdo=0&wiekod=' + wiek + '&wiekdo=' + wiek + '&wagaod=' + waga + '&wagado=' + waga + '&wzrostod=' + wzrost + '&wzrostdo=' + wzrost + '&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=&key_word=#show" > <span class="' + linkClass + '">' + valueElement.innerText + '</span> </a>';
}

function getStateForCity(city) {
	const cities = document.querySelectorAll('#lista_miast .city_name');
	var state;
	for (var i = 0; i < cities.length; i++) {
		if (cities[i].innerText === city) {
			state = cities[i].parentNode.querySelector('.woj_name').innerText;
			break;
		}
	}
    state = state.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace('ł', 'l');
	return state;
}

function getLabelElement(label, valueSelector) {
    var matchedLi = findElementByLabel(label);
    return matchedLi.querySelector(valueSelector);
}

function findElementByLabel(label) {
    var filter = Array.prototype.filter;
    var result = document.querySelectorAll('#anons_details li');
    var filtered = filter.call( result, function( node ) {
        return node.innerText.indexOf(label)!=-1;
    });
    if (filtered.length > 0) {
        return filtered[0];
    }
}

//--------------

function executeMain() {
	if (window.location.hostname.indexOf(g) != -1) {
		// alternative search using internal Forum engine
		checkIfSearchResultsLoaded();
	} else if (window.location.hostname.indexOf(r) != -1) {
		// adds buttons on r
		addButtonsForRiO();
		// add buttons for internal r search
		addCityLink();
		addAgeLink();
		addWeightLink();
		addHeightLink();
		addPriceLink();
	} else {
		// adds buttons on o and hm
		addButtonsForRiO();
	}
}

//--------------

executeMain();
