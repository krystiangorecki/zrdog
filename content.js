// 'use strict';

var r = decodeURIComponent('%77%77%77%2e%72%6f%6b%73%61%2e%73%78');
var g = decodeURIComponent('%77%77%77%2e%67%61%72%73%6f%6e%69%65%72%61%2e%63%6f%6d%2e%70%6c');
var hm = decodeURIComponent('%77%77%77%2e%68%6f%74%6d%61%78%2e%70%6c');
var e = decodeURIComponent('%65%72%6f%6d%65%74%72%2e%70%6c');
var o = decodeURIComponent('%6f%64%6c%6f%74%79%2e%70%6c');
var esc = decodeURIComponent('%65%73%63%6f%72%74%2e%70%6c');

var autosearch = 1;

var noteLoaded = false;
var numberRevealed = false;

function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function applyDynamicTarget() {
	chrome.storage.sync.get(['openInNewTab'], function (result) {
		var openInNewTab = result.openInNewTab;
		const links = Array.prototype.slice.apply(document.querySelectorAll('a.dynamicTarget'));
		for (var i = 0; i < links.length; i++) {
			if (openInNewTab) {
				links[i].target = "_blank";
			}
		}
	});
}


// adds g link on esc
function executeEscdoG() {
	var phoneElement = document.querySelector('div.content-info-col.col.-info div.contact-elem.-phone');

	var linkAlreadyAdded = phoneElement.parentElement.querySelector('#escdog');
	if (linkAlreadyAdded != undefined) {
		console.log('prevented adding duplicate link "g"');
		return;
	}

	var phone = phoneElement.textContent;
	phone = cleanPhone(phone);

	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q=%22' + phone + '%22';

	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a id="escdog" href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;g&nbsp;</a>';

	var contactElement = phoneElement;
	insertAfter(contactElement, newLink);
}

// adds g link on esc
function executeEscdoEsc() {
	var phoneElement = document.querySelector('div.content-info-col.col.-info div.contact-elem.-phone');

	var linkAlreadyAdded = phoneElement.parentElement.querySelector('#escdoesc');
	if (linkAlreadyAdded != undefined) {
		console.log('prevented adding duplicate link "e"');
		return;
	}

	var phone = phoneElement.textContent;
	phone = cleanPhone(phone);

	var url = 'https://' + esc + '/szukaj/?q=' + phone;

	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a id="escdoesc" href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;e&nbsp;</a>';

	var contactElement = phoneElement;
	insertAfter(contactElement, newLink);
}

// adds g link on r
function executeRdoG() {
	var lis = document.querySelectorAll('.cts-main-column ul.extra-details>li');
	for (var i =0 ; i<lis.length ; i++) {
		if(contains(lis[i].querySelector('.item-attr').innerText, 'Telefon')) {
			var phoneElement = lis[i];
			var phone = lis[i].querySelector('.item-property').innerText.trim();
			phone = phone.split(' ').join('-');
			if (phone.length == 9) {
				phone = phone.substring(0,3) + '-' + phone.substring(3,6) + '-' + phone.substring(6,9);
			}
			break;
		}
	}

	// create URL to search for a phone number with dashes
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q=%22' + phone + '%22';

	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;g&nbsp;</a>';

	// get element "Kontakt"...
	//var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
	// ... insert new link after it
	insertAfter(phoneElement, newLink);
}

// adds g link on r by ad number
function executeRdoGByAdNumber() {
	var pathname = window.location.pathname;
	var adNumber = pathname.substring(pathname.lastIndexOf('/')+1);
	//alert(adNumber);

	// create URL to search for a phone number with dashes
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q=' + adNumber;

	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" > g2 </a>';

	// get element "Kontakt"...
	var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
	// ... insert new link after it
	insertAfter(contactElement, newLink);
}

// adds link to g on o
function executeOdoG() {
	// get element with phone number
	var phoneElement = document.querySelector('h3.contactNumber');
	if (phoneElement == undefined) {
		phoneElement = document.querySelector('div.details > table h3');
	}
	// get number text from element
	var phone = phoneElement.textContent;
	phone = cleanPhone(phone);
	//alert(phone);

	// create URL to search for a phone number with dashes
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q=%22' + phone.split(' ').join('-') + '%22';
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;g&nbsp;</a>';

	// inserts link after phone number
	insertAfter(phoneElement, newLink);
}

// adds link to g on o
function executeOdoEsc() {
	// get element with phone number
	var phoneElement = document.querySelector('h3.contactNumber');
	if (phoneElement == undefined) {
		phoneElement = document.querySelector('div.details > table h3');
	}
	// get number text from element
	var phone = phoneElement.textContent;
	phone = cleanPhone(phone);
	//alert(phone);

	// create URL to search for a phone number
	var url = 'https://' + esc + '/szukaj/?q=' + phone;var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;e&nbsp;</a>';

	// inserts link after phone number
	insertAfter(phoneElement, newLink);
}

// adds link to g on hm
function executeHMdoG() {
	// get element with phone number
	var phoneElement = document.querySelector('div.anons_telefon');
	// get number text from element
	var phone = phoneElement.textContent;
	phone = cleanPhone(phone);
	//alert(phone);

	// create URL to search for a phone number with dashes
	var url = 'http://' + g + '/forum/index.php?app=googlecse#gsc.tab=0&gsc.q=%22' + phone.split(' ').join('-') + '%22';
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;g&nbsp;</a>';

	// inserts link after phone number
	insertAfter(phoneElement, newLink);
}
// adds links to r on r to allow searching for more ads with the same phone number
function executeRdoR() {
	var phoneElement = document.querySelector('#anons_details span.dane_anonsu_tel');
	var phone = phoneElement.textContent;
	phone = cleanPhone(phone);
	//alert(phone);

	var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' + phone.split(' ').join('').split('-').join('') + "&key_word=#show";
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;r&nbsp;</a>';
	// get element "Kontakt"...
	var contactElement = document.querySelector('#anons_details span.dane_anonsu_tytul');
	// ... insert new link after it
	insertAfter(contactElement, newLink);
}

// adds link to e on r to allow searching for reviews for the same phone number
function executeRdoEsc() {
	var lis = document.querySelectorAll('.cts-main-column ul.extra-details>li');
	for (var i =0 ; i<lis.length ; i++) {
		if(contains(lis[i].querySelector('.item-attr').innerText, 'Telefon')) {
			var phoneElement = lis[i];
			var phone = lis[i].querySelector('.item-property').innerText.trim();
			phone = phone.split(' ').join('-');
			if (phone.length == 9) {
				phone = phone.substring(0,3) + '-' + phone.substring(3,6) + '-' + phone.substring(6,9);
			}
			break;
		}
	}

	var url = 'https://' + esc + '/szukaj/?q=' + phone;
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;e&nbsp;</a>';

	insertAfter(phoneElement, newLink);
}

// adds links to r on o
function executeOdoR() {
	var phoneElement = document.querySelector('div.details h3');
	var phone = phoneElement.textContent;
	phone = cleanPhone(phone);
	//alert(phone);

	var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' +  phone.split(' ').join('').split('-').join('')  + "&key_word=#show";
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;r&nbsp;</a>';

	insertAfter(phoneElement, newLink);
}

// adds links to r on hm
function executeHMdoR() {
	var phoneElement = document.querySelector('div.anons_telefon');
	var phone = phoneElement.textContent;
	phone = cleanPhone(phone);
	//alert(phone);

	var url = 'https://www.' + r + '/pl/szukaj/?anons_type=0&anons_state=0&anons_city_part=&cenaod=0&cenado=0&cenapoldo=0&cena15do=0&cenanocdo=0&wiekod=0&wiekdo=0&wagaod=0&wagado=0&wzrostod=0&wzrostdo=0&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=' + phone.split(' ').join('').split('-').join('') + "&key_word=#show";
	var newLink = document.createElement("span");
	newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;r&nbsp;</a>';

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
		newLink.innerHTML = ' <a href="' + url + '" class="linkDoG dynamicTarget" >&nbsp;r&nbsp;</a>';

		insertAfter(phoneElements[i], newLink);
	}
}

// adds buttons on r
function addButtonsForR() {
	// add link to r (other ads for the same number)
	//executeRdoR();
	// add link to e
	executeRdoEsc();
	// add link to g
	executeRdoG();
	applyDynamicTarget();
}

//--------------
// r and o part above
// g alternative search part below
//--------------

var searchResultsLoaded = false;

// called when search was performed too often and certain number of seconds have already passed
function searchAgainAfterWaiting() {
	document.querySelector('input[name="submit"]').click();
}

function checkIfSearchResultsLoaded() {
	// jeśli nie jestem na urlu usuniętego wyszkiwania google ani wyszukiwania forumowego
	if (!contains(window.location.href, 'app=googlecse') && !contains(window.location.href, 'do=search')){
		return;
	}
	var notEmptySearchResults = document.querySelector('#middle_column .ipsFilterbar') != null;
	if (notEmptySearchResults) {
		return;
	}
	// check if antiflood search protection is present
	var protection = document.querySelector('#middle_column p.message.error');
	if (protection != null && protection.textContent.indexOf('odczekać') != -1) {
		var timeToWait = protection.textContent.replace(/\D/g, '');
		setTimeout(searchAgainAfterWaiting, timeToWait * 1100);
	} else {
		var regex = /(\d\d\d[^0-9]?\d\d\d[^0-9]?\d\d\d)/;
		var sanitizedHref = window.location.href.replaceAll('%22','');
		var phone = getValueUsingRegex(sanitizedHref, regex)
		phone = phone.split(' ').join('-');
		if (phone.length == 9) {
			phone = phone.substring(0,3) + '-' + phone.substring(3,6) + '-' + phone.substring(6,9);
		}
		document.querySelector('#main_search').value = '"' + phone + '"';
		document.querySelector('#search-box').submit();
	}
}

function contains(haystack, needle) {
	return haystack.indexOf(needle)>-1;
}

function getValueUsingRegex(haystack, regex) {
	let match = regex.exec(haystack);
	return match[1];
}

//--------------- FILTERING LINKS FOR R
//
// function addCityLink() {
//     var cityElement = getLabelElement("Miasto", ".dane_anonsu_fiolet");
//     cityElement.outerHTML = '<a href="https://www.' + r + '/pl/anonse/wszystkie/' + cityElement.innerText + '" ><span class="dane_anonsu_fiolet dane_anonsu_tytul">' + cityElement.innerText + '</span> </a>';
// }
//
// function addPriceLink() {
// 	var valueElement = getLabelElement("1 godz", ".dane_anonsu_tytul:nth-child(2)");
// 	if (valueElement == undefined) {
// 		return;
// 	}
//     var cena = valueElement.innerText.match(/(\d+)/gi)[0];
//     addLinkForLabel(valueElement, cena, 0, 0, 0, "dane_anonsu_fiolet dane_anonsu_tytul");
// }
//
// function addAgeLink() {
// 	var valueElement = getLabelElement("Wiek", ".dane_anonsu_value");
// 	if (valueElement == undefined) {
// 		return;
// 	}
//     var wiek = valueElement.innerText.match(/(\d+)/gi)[0];
//     addLinkForLabel(valueElement, 0, wiek, 0, 0, "dane_anonsu_value");
// }
//
// function addWeightLink() {
// 	var valueElement = getLabelElement("Waga", ".dane_anonsu_value");
// 	if (valueElement == undefined) {
// 		return;
// 	}
//     var waga = valueElement.innerText.match(/(\d+)/gi)[0];
//     addLinkForLabel(valueElement, 0, 0, waga, 0, "dane_anonsu_value");
// }
//
// function addHeightLink() {
// 	var valueElement = getLabelElement("Wzrost", ".dane_anonsu_value");
// 	if (valueElement == undefined) {
// 		return;
// 	}
//     var wzrost = valueElement.innerText.match(/(\d+)/gi)[0];
//     addLinkForLabel(valueElement, 0, 0, 0, wzrost, "dane_anonsu_value");
// }
//
// function addLinkForLabel(valueElement, cena, wiek, waga, wzrost, linkClass){
//     var city = getLabelElement("Miasto", ".dane_anonsu_fiolet").innerText;
// 	var state = getStateForCity(city);
//     valueElement.outerHTML = '<a href="https://www.' + r + '/pl/szukaj/?anons_type=a&anons_category=0&anons_city%5B%5D=' + city + '&anons_state=' + state + '&cenaod=' + cena + '&cenado=' + cena + '&cenapoldo=0&cena15do=0&cenanocod=0&cenanocdo=0&wiekod=' + wiek + '&wiekdo=' + wiek + '&wagaod=' + waga + '&wagado=' + waga + '&wzrostod=' + wzrost + '&wzrostdo=' + wzrost + '&biustod=0&biustdo=0&jezyk=&dzien=0&hod=&hdo=&wyjazdy=0&name=&nr_tel=&key_word=#show" > <span class="' + linkClass + '">' + valueElement.innerText + '</span> </a>';
// }
//
// function getStateForCity(city) {
// 	const cities = document.querySelectorAll('#lista_miast .city_name');
// 	var state;
// 	for (var i = 0; i < cities.length; i++) {
// 		if (cities[i].innerText === city) {
// 			state = cities[i].parentNode.querySelector('.woj_name').innerText;
// 			break;
// 		}
// 	}
//     state = state.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace('ł', 'l');
// 	return state;
// }
//
// function getLabelElement(label, valueSelector) {
// 	var matchedLi = findElementByLabel(label);
// 	if (matchedLi == undefined) {
// 		return null;
// 	}
// 	return matchedLi.querySelector(valueSelector);
// }
//
// function findElementByLabel(label) {
//     var filter = Array.prototype.filter;
//     var result = document.querySelectorAll('#anons_details li');
//     var filtered = filter.call( result, function( node ) {
//         return node.innerText.indexOf(label)!=-1;
//     });
//     if (filtered.length > 0) {
//         return filtered[0];
//     }
// }


//--------------- FILTERING LINKS FOR ESC

 function addAgeLink() {
	 var valueElement = getLabelElement("Wiek", ".sub-desc");
	 if (valueElement == undefined) {
		 return;
	 }
	 var wiek = valueElement.innerText.match(/(\d+)/gi)[0];
	 addLinkForLabel(valueElement, 0, wiek, 0, 0, "");
 }

 function addWeightLink() {
	 var valueElement = getLabelElement("Waga", ".sub-desc");
	 if (valueElement == undefined) {
		 return;
	 }
	 var waga = valueElement.innerText.match(/(\d+)/gi)[0];
	 addLinkForLabel(valueElement, 0, 0, waga, 0, "");
 }

 function addHeightLink() {
	var valueElement = getLabelElement("Wzrost", ".sub-desc");
	 if (valueElement == undefined) {
		 return;
	 }
	 var wzrost = valueElement.innerText.match(/(\d+)/gi)[0]
	 addLinkForLabel(valueElement, 0, 0, 0, wzrost, "");
 }

 function addPriceLink() {
	var valueElement = getLabelElement("1 godz", ".sub-desc");
	if (valueElement == undefined) {
		return;
	}
	var cena = valueElement.innerText.match(/(\d+)/gi)[0];
	addLinkForLabel(valueElement, cena, 0, 0, 0, "");
 }

 function getLabelElement(label, valueSelector) {
	var matchedLi = findElementByLabel(label);
	if (matchedLi == undefined) {
		return null;
	}
	return matchedLi.querySelector(valueSelector);
 }

 function addLinkForLabel(valueElement, cena, wiek, waga, wzrost, linkClass) {
	var link = document.querySelector('div.content-location > span.sub-label > a:nth-child(2)')
	var baseSearchURL = link.href;
	valueElement.outerHTML = '<a href="' + baseSearchURL + '?filter_price_type=60' +
	'&filter_price=' + cena + '%3B' + (cena>0?cena:10000) +
	'&filter_age=' + (wiek>0?wiek:18) + '%3B' + (wiek>0?wiek:100) + 
	'&filter_weight=' + (waga>0?waga:30) + '%3B' + (waga>0?waga:200) + 
	'&filter_height=' + (wzrost>0?wzrost:100) + '%3B' + (wzrost>0?wzrost:220) + 
	'&filter_breasts=0%3B8&q=" style="color:white; font-size:larger" class="' + linkClass + '">' + valueElement.innerText + ' </a>';
 }

 function findElementByLabel(label) {
	 var filter = Array.prototype.filter;
	 var result = document.querySelectorAll('div.stats-box > div.stat-elem');
	 var filtered = filter.call( result, function( node ) {
		 return node.innerText.indexOf(label)!=-1;
	 });
	if (filtered.length > 0) {
		return filtered[0];
	}
}

//--------------
// monitoring number reveal

function attachNumberRevealObserver() {
	var containersToMonitor = document.querySelectorAll('div.content-info a[data-show-phone]');
	containersToMonitor.forEach(obj => {
		observeDOM( obj, function(m){
			var addedNodes = [];
			m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
			if (addedNodes.length > 0) {
				numberRevealed = true;
				console.log("NUMBER REVEALED");
				addNumberToNoteIfPossible();
				executeEsc();
			}
		});
	} );
}

//--------------
// monitoring note loaded

function attachNoteLoadedObserver() {
	var containersToMonitor = document.querySelectorAll('div.content-info-wrapper.-left');
	containersToMonitor.forEach(obj => {
		observeDOM( obj, function(m){
			var addedNodes = [];
			m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
			if (addedNodes.length > 0){
				for (var i = 0 ; i<addedNodes.length ; i++) {
					if (addedNodes[i].tagName==null) {
						continue;
					}
					if (contains(addedNodes[i].tagName, "FORM")) {
						noteLoaded = true;
						console.log("NOTE LOADED");
						addNumberToNoteIfPossible();
					}
				}
			}
		});
	} );
}

// https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
var observeDOM = (function() {
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	return function( obj, callback ){
		if( !obj || obj.nodeType !== 1 ) return;

		if( MutationObserver ){
			var mutationObserver = new MutationObserver(callback)
			mutationObserver.observe( obj, { childList:true, subtree:true })
			return mutationObserver
		}
	}
})();

//--------------

function revealPhoneNumber() {
	attachNumberRevealObserver();
	var phoneElement = document.querySelector('div.content-info a[data-show-phone]');
	if (phoneElement != null) {
		phoneElement.click();
	}
}

function executeEsc() {
	executeEscdoEsc();
	executeEscdoG();
}

//--------------
// showing note

function showNote() {
	var hasExistingNote = document.querySelector('section.anons-sec .content-actions-col span.icon-holder.icon-green');
	if (hasExistingNote != undefined) {
		attachNoteLoadedObserver();
		var id = getAdId();
		var xhr = new XMLHttpRequest();
		var noteURL = "https://escort.pl/action.php?action=addUserNote&id=" + id;
		xhr.open("GET", noteURL, true);
		xhr.onload = function (e) {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var el = document.createElement('html');
					el.innerHTML = xhr.responseText;
					var form = el.querySelector('form');
					form.action = noteURL;
					var textarea = el.querySelector( 'textarea' );
					textarea.style='color:white ; width:100% ; line-height: 1.1; margin-top: 15px';
					textarea.id='';
					var destinationElement = document.querySelector('div.content-info-col');
					insertAfter(destinationElement, form);
					textarea.style.height = "";
					textarea.style.height = textarea.scrollHeight + 5 + "px";
					ajaxifyNoteForm(form);
					var contentChanged = fixNote(textarea);
					if (contentChanged) {
						form.submit();
					}
				} else {
					console.error(xhr.statusText);
				}
			}
		};
		xhr.onerror = function (e) {
			console.error(xhr.statusText);
		};
		xhr.send(null);
	}

}

function fixNote(textarea) {
	var before = textarea.value;
	textarea.value = textarea.value.replace(/\n\s*\n/g,'\n').replaceAll(' [g]','');
	var after = textarea.value;
	return before != after;
}

function ajaxifyNoteForm(form){
	form.target="invisibleIframe";
	var newInvisibleIframe = document.createElement("iframe");
	newInvisibleIframe.id = 'invisibleIframe';
	newInvisibleIframe.name = 'invisibleIframe';
	newInvisibleIframe.style = 'height:15px';
	insertAfter(form, newInvisibleIframe);
}

function getAdId(){
	var result;
	var regex = /(\d+).html/;
	let match = regex.exec(window.location.href);
	if (match != undefined) {
		result = parseInt(match[1]);
		return result;
	}
	return undefined;
}

// -------------------------- 
// ADDING NUMBERS TO NOTE
function addNumberToNoteIfPossible() {
	console.log("addNumberToNoteIfPossible? " + noteLoaded + " " + numberRevealed);
	if (noteLoaded && numberRevealed) {
		addNumberToNote();
	}
}

function addNumberToNote() {
	var phoneElement = document.querySelector('div.content-info-col.col.-info div.contact-elem.-phone');
	var phone = phoneElement.textContent;
	phone = cleanPhone(phone);

	var textarea = document.querySelector('textarea[name=note]');
	var note = textarea.value;
	if (!contains(note, " ; " + phone) && !contains(note, phone + " ; " )) {
		textarea.value = phone + " ; " + note;
		var form = document.querySelector('#noteForm');
		form.submit();
	}
}
// fix description

function fixLineBreaksInDescription(){
	var description = document.querySelector('#isoTabsContent');
	if (description!=null) {
		description.innerHTML = description.innerHTML.replaceAll('<br>\n<br>','<br>');
	}
}

function cleanPhone(phone) {
	debugger;
	phone = phone.replace('+48 ','');
	phone = phone.replace('tel.','');
	if (phone.indexOf(')') > -1) {
		phone = phone.substring(phone.indexOf(')')+1);
	}
	phone = phone.trim();
	phone = phone.replaceAll(' ','-');
	return phone;
}

// --------------------------

function executeMain() {
	if (window.location.hostname.indexOf(esc) != -1) {
		revealPhoneNumber();
		fixLineBreaksInDescription();
		showNote();
		// internal e search
		addAgeLink();
		addWeightLink();
		addHeightLink();
		addPriceLink();
	} else if (window.location.hostname.indexOf(g) != -1) {
		// alternative search using internal Forum engine
		checkIfSearchResultsLoaded();
	} else if (window.location.hostname.indexOf(r) != -1) {
		// adds buttons on r
		addButtonsForR();
		// add buttons for internal r search
		/*
		addCityLink();
		addAgeLink();
		addWeightLink();
		addHeightLink();
		addPriceLink();
		*/
	}
}

//--------------

executeMain();
