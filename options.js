// Saves options to chrome.storage

// openTwoAtOnce is deprecated but whole logic is left for future reuse!

function saveOptions() {
  //alert('saving');
  var openInNewTab = document.getElementById('openInNewTab').checked;
  var openTwoAtOnce = false; //document.getElementById('openTwoAtOnce').checked;
  chrome.storage.sync.set({
    openInNewTab: openInNewTab,
	openTwoAtOnce: openTwoAtOnce
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'zapisano! odśwież zakładki z ogłoszeniami';
    setTimeout(function() {
      status.textContent = '';
    }, 1500);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  //alert('restoring');
  chrome.storage.sync.get({
    openInNewTab: false,
	openTwoAtOnce: false
  }, function(items) {
    document.getElementById('openInNewTab').checked = items.openInNewTab;
    //document.getElementById('openTwoAtOnce').checked = items.openTwoAtOnce;
	//showOrHideSubCheckbox();
  });
}

function showOrHideSubCheckbox() {
  //alert('showOrHideSubCheckbox');
  var openInNewTab = document.getElementById('openInNewTab').checked;
  var openTwoAtOnceContainer = document.getElementById('openTwoAtOnceContainer');
  openTwoAtOnceContainer.style.display = openInNewTab ? "" : "none";
}
  
document.addEventListener('DOMContentLoaded', restoreOptions);
// document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('openInNewTab').addEventListener('change', saveOptions);
//document.getElementById('openInNewTab').addEventListener('change', showOrHideSubCheckbox);
//document.getElementById('openTwoAtOnce').addEventListener('change', saveOptions);
