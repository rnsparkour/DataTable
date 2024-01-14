// Function to enable editing of table cells
function enableEditing() {
  var table = document.getElementById('resultsTable');

  table.addEventListener('mouseover', function(e) {
    var cell = e.target;

    // Check if the cell is within the tbody
    if (cell.tagName === 'TD') {
      // Make the cell editable
      cell.contentEditable = true;

      // Add a focus event listener to track changes
      cell.addEventListener('focusout', function() {
        // Update the cell value when focus is lost
        cell.contentEditable = false;
      });
    }
  });
}

// Function to add a new row to the table
function addRow() {
  var tableBody = document.getElementById('tableBody');
  var newRow = tableBody.insertRow(tableBody.rows.length);

  for (let i = 0; i < 4; i++) {
    var newCell = newRow.insertCell(i);
    newCell.innerHTML = ''; // Initially, set the content to an empty string
  }

  // Enable editing for the newly added row
  enableEditing();
}

// Function to remove the last row from the table
function removeRow() {
  var tableBody = document.getElementById('tableBody');
  if (tableBody.rows.length > 0) {
    tableBody.deleteRow(tableBody.rows.length - 1);
  }
}

// Call enableEditing function to initialize
enableEditing();
