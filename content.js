// 'use strict';

var r = decodeURIComponent('%72%6f%6b%73%61%2e%70%6c');
var g = decodeURIComponent('%77%77%77%2e%67%61%72%73%6f%6e%69%65%72%61%2e%63%6f%6d%2e%70%6c');

function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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

// adds links to r on r to allow searching for more ads with the same phone number
function executeRdoR() {
	var phoneElement = document.querySelector('#anons_details span.dane_anonsu_tel');
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' + phone.split(' ').join('') + "&key_word=#show";
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > r </a>';
	// get element "Kontakt"...
	var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
	// ... insert new link after it
	insertAfter(contactElement, newLink);
}

// adds links to r on o
function executeOdoR() {
	var phoneElement = document.querySelector('h3.contactNumber');
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' + phone.split(' ').join('') + "&key_word=#show";
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > r </a>';

	insertAfter(phoneElement, newLink);
}

function executeMain() {

	if (window.location.hostname.indexOf(g) != -1) {
		// alternative search using internal Forum engine
		checkIfSearchResultsLoaded();
	} else {
		// adds buttons on r and o
		addButtonsForRiO();
	}

}

// adds buttons on r and o
function addButtonsForRiO() {
	if (window.location.hostname.indexOf(r) != -1) {
		// add link to r (other ads for the same number)
		executeRdoR();
		// add lik to g
		executeRdoG();
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

function checkIfSearchResultsLoaded() {
	tries++;
	var element = document.querySelector("div.gsc-result");
	// alert('try number ' + tries + ' element = ' + element);
	searchResultsLoaded = element != null;
	//alert('searchResultsLoaded? ' +searchResultsLoaded);
	if (!searchResultsLoaded) {
		if (tries < 10) {
			setTimeout(checkIfSearchResultsLoaded, 500);
		}
	} else {
		continueExecution();
	}
}

function continueExecution() {
	var noResults = document.querySelector("div.gs-snippet");
	// alert('noResults ' + noResults);
	if (noResults != null) {
		addButton();
	}
}

function doSearch() {
	var number = document.querySelector("#gsc-i-id1").value;
	document.querySelector('#main_search').value = number;
	document.querySelector('#search_options').click();
	document.querySelector('label[title="Forum"]').click();
	document.querySelector('#search-box').submit();
}

function addButton() {
	// alert('adding button');
	var destinationElement = document.querySelector(".gsc-resultsHeader");
	var searchButton = document.createElement("a");
	searchButton.setAttribute('href', '#');
	searchButton.addEventListener("click", doSearch);
	searchButton.setAttribute('style', ' margin-left:20px; background-color: white;  color: black;  text-color: black;  border: 2px solid red;  padding: 1px 2px;  text-align: center;  text-decoration: none;  display: inline-block;');
	searchButton.text = ' szukaj bezpośrednio na Forum';
	insertAfter(destinationElement, searchButton);
}

//--------------

executeMain();
