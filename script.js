


//Add a Function to Save Data:
function saveTableData() {
  var tableData = [];
  var tableBody = document.getElementById('tableBody');

  // Iterate through rows and save data
  for (var i = 0; i < tableBody.rows.length; i++) {
    var rowData = [];
    var cells = tableBody.rows[i].cells;

    // Iterate through cells and save content
    for (var j = 0; j < cells.length; j++) {
      rowData.push(cells[j].innerText.trim());
    }

    tableData.push(rowData);
  }

  // Save data to localStorage
  localStorage.setItem('tableData', JSON.stringify(tableData));
}

function updateStyling(row) {
  var resultValue = row.cells[3].innerText.trim().toLowerCase(); // Convert to lowercase

  // Update background color based on the result value for the W/L column (index 3)
  var wLCell = row.cells[3];
  if (resultValue === 'w') {
    wLCell.style.backgroundColor = '#00e192'; // Green background for wins in W/L column
  } else if (resultValue === 'l') {
    wLCell.style.backgroundColor = '#ff6666'; // Red background for losses in W/L column
  } else {
    wLCell.style.backgroundColor = ''; // Reset background color for other results
  }

  // Update font color based on the result value
  var cells = row.cells;
  for (var i = 0; i < cells.length; i++) {
    if (resultValue === 'w' || resultValue === 'l') {
      cells[i].style.color = '#606060'; // Set text color to #606060 for 'w' or 'l'
    } else {
      cells[i].style.color = '#fff'; // Set text color to white for other results
    }
  }

  // Save data to localStorage
  saveTableData();
}

// Function to add a new row to the table
function addRow() {
  var tableBody = document.getElementById('tableBody');
  var newRow = tableBody.insertRow(tableBody.rows.length);

  for (let i = 0; i < 4; i++) {
    var newCell = newRow.insertCell(i);
    newCell.innerHTML = ''; // Initially, set the content to an empty string
    newCell.contentEditable = true; // Make the cell editable
  }

  // Enable focusout event listener for styling updates
  newRow.addEventListener('focusout', function () {
    // Update the styling based on the result value
    updateStyling(newRow);
  });


}

// Function to update the styling for existing rows
function updateStylingForExistingRows() {
  var tableBody = document.getElementById('tableBody');

  // Loop through existing rows and update styling
  for (var i = 0; i < tableBody.rows.length; i++) {
    updateStyling(tableBody.rows[i]);

  }

}

// Call updateStylingForExistingRows after adding rows
updateStylingForExistingRows();
// Add a Function to Remove Row:
function removeRow() {
  var tableBody = document.getElementById('tableBody');
  var lastRowIndex = tableBody.rows.length - 1;

  if (lastRowIndex >= 0) {
    tableBody.deleteRow(lastRowIndex);
    saveTableData(); // Save data after removing a row
  }
}

// ... (other functions and code)

// Call removeRow when the "-" button is clicked
function removeRow() {
  var tableBody = document.getElementById('tableBody');
  var lastRowIndex = tableBody.rows.length - 1;

  if (lastRowIndex >= 0) {
    tableBody.deleteRow(lastRowIndex);
    saveTableData(); // Save data after removing a row
  }
}


// Function to load data from localStorage
function loadTableData() {
  var tableData = localStorage.getItem('tableData');

  if (tableData) {
    tableData = JSON.parse(tableData);

    // Populate the table with loaded data
    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    for (var i = 0; i < tableData.length; i++) {
      var newRow = tableBody.insertRow(tableBody.rows.length);

      for (var j = 0; j < tableData[i].length; j++) {
        var newCell = newRow.insertCell(j);
        newCell.innerHTML = tableData[i][j];
        newCell.contentEditable = true; // Make the cell editable
      }

      // Enable focusout event listener for styling updates
      newRow.addEventListener('focusout', function () {
        // Update the styling based on the result value
        updateStyling(newRow);
      });

      // Update styling for the loaded row
      updateStyling(newRow);
    }

    const rows = Array.from(document.querySelectorAll('tr'));

    function slideOut(row) {
      row.classList.add('slide-out');
    }

    function slideIn(row, index) {
      setTimeout(function () {
        row.classList.add('slide-in');
      }, (index + 5) * 100);
    }

    rows.forEach(slideOut);

    rows.forEach(slideIn);

    // Enable editing after loading data
    enableEditing();
  }
}

// Call loadTableData on page load
loadTableData();


// Function to clear all data
function clearAllData() {
  var tableBody = document.getElementById('tableBody');

  // Clear table
  tableBody.innerHTML = '';

  // Clear localStorage
  localStorage.removeItem('tableData');
}
