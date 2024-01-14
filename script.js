// Function to update the styling based on the result value
function updateStyling(row) {
  var resultValue = row.cells[3].innerText.trim().toLowerCase(); // Convert to lowercase

  // Update row color based on the result value
  if (resultValue === 'w') {
    row.style.backgroundColor = '#c8e6c9'; // Green background for wins
  } else if (resultValue === 'l') {
    row.style.backgroundColor = '#ffcdd2'; // Red background for losses
  }
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
