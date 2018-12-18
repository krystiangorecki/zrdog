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

// na stronie r dodaje linki do g
function executeRdoGDouble() {
	// wyszukuję element z numerem telefonu
	var phoneElement = document.querySelector('#anons_details span.dane_anonsu_tel');
	// pobieram z niego sam numer
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	// tworzę link do wyszukiwania numeru telefonu ze spacjami
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone + '"';
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > g </a>';

	// tworzę link do wyszukiwania numeru telefonu z myślnikami
	var url2 = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone.split(' ').join('-') + '"';
	var newLink2 = document.createElement("span");
	newLink2.innerHTML = ' <a href="' + url2 + '" class="linkDoG dynamicTarget" > g- </a>';

	// wyszukuje element "Kontakt"...
	var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
	// ... i wstawia za nim oba linki
	insertAfter(contactElement, newLink2);
	insertAfter(contactElement, newLink);
}

// na stronie o dodaje linki do g
function executeOdlotyGDouble() {
	// wyszukuję element z numerem telefonu
	var phoneElement = document.querySelector('h3.contactNumber');
	// pobieram z niego sam numer
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	// tworzę link do wyszukiwania numeru telefonu ze spacjami
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone + '"';
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > g </a>';

	// tworzę link do wyszukiwania numeru telefonu z myślnikami
	var url2 = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone.split(' ').join('-') + '"';
	var newLink2 = document.createElement("span");
	newLink2.innerHTML = ' <a href="' + url2 + '" class="linkDoG dynamicTarget" > g- </a>';

	// wyszukuje element "Kontakt"...
	insertAfter(phoneElement, newLink2);
	// ... i wstawia za nim oba linki
	insertAfter(phoneElement, newLink);
}

// na stronie r dodaje linki do g
function executeRdoGSingle() {
	// wyszukuję element z numerem telefonu
	var phoneElement = document.querySelector('#anons_details span.dane_anonsu_tel');
	// pobieram z niego sam numer
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	// tworzę URL do wyszukiwania numeru telefonu ze spacjami
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone + '"';
	// tworzę URL do wyszukiwania numeru telefonu z myślnikami
	var url2 = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone.split(' ').join('-') + '"';

	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="#" class="linkDoG dynamicTarget" > g </a>';
	newLink.addEventListener("click", function (data) {
		window.open(url);
		window.open(url2);
	});

	// wyszukuje element "Kontakt"...
	var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
	// ... i wstawia za nim link
	insertAfter(contactElement, newLink);
}

// na stronie o dodaje linki do g
function executeOdlotyGSingle() {
	// wyszukuję element z numerem telefonu
	var phoneElement = document.querySelector('h3.contactNumber');
	// pobieram z niego sam numer
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	// tworzę URL do wyszukiwania numeru telefonu ze spacjami
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone + '"';
	// tworzę URL do wyszukiwania numeru telefonu z myślnikami
	var url2 = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q="' + phone.split(' ').join('-') + '"';
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="#" class="linkDoG dynamicTarget" > g </a>';
	newLink.addEventListener("click", function (data) {
		window.open(url);
		window.open(url2);
	});

	// wstawia link
	insertAfter(phoneElement, newLink);
}

// na stronie r dodaje linki do r
function executeRdoR() {
	var phoneElement = document.querySelector('#anons_details span.dane_anonsu_tel');
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' + phone.split(' ').join('') + "&key_word=#show";
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > r </a>';
	// wyszukuje element "Kontakt"...
	var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
	// ... i wstawia za nim link
	insertAfter(contactElement, newLink);
}

// na stronie o dodaje linki do r
function executeOdlotyR() {
	var phoneElement = document.querySelector('h3.contactNumber');
	var phone = phoneElement.textContent.trim();
	//alert(phone);

	var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' + phone.split(' ').join('') + "&key_word=#show";
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > r </a>';

	insertAfter(phoneElement, newLink);
}

function getOptionsAndExecute() {
debugger;
	chrome.storage.sync.get(['openInNewTab'], function (result) {

		var openInNewTab = result.openInNewTab;
		chrome.storage.sync.get(['openTwoAtOnce'], function (result) {

			var openTwoAtOnce = result.openTwoAtOnce;
			continueExecutionWithOptionsLoaded(openInNewTab, openTwoAtOnce);
		});
	});

}

function continueExecutionWithOptionsLoaded(openInNewTab, openTwoAtOnce) {
	if (window.location.hostname.indexOf(r) != -1) {
		// dodaj link do r (inne ogłozsenia dla tego samego numeru)
		executeRdoR();
		// dodaj link do g
		if (openInNewTab && openTwoAtOnce) {
			executeRdoGSingle();
		} else {
			executeRdoGDouble();
		}

	} else {
		// dodaj link do r
		executeOdlotyR();
		// dodaj link do g
		if (openInNewTab && openTwoAtOnce) {
			executeOdlotyGSingle();
		} else {
			executeOdlotyGDouble();
		}

	}
	applyDynamicTarget();
}

getOptionsAndExecute();
