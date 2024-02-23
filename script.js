


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
function removeEmptyRows() {
  const tableBody = document.getElementById('tableBody');
  const rows = tableBody.rows;

  // Use a reverse loop since we'll be removing rows from the collection
  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];
    let isEmpty = true;

    // Check each cell in the row
    for (let j = 0; j < row.cells.length; j++) {
      const cell = row.cells[j];
      if (cell.textContent.trim() !== "") {
        // If any cell is not empty, mark row as not empty and break the loop
        isEmpty = false;
        break;
      }
    }

    // If the row is empty, remove it
    if (isEmpty) {
      tableBody.deleteRow(i);
    }
  }
}
function updateStyling(row) {
  var cells = row.cells;
  for (var i = 0; i < cells.length; i++) {
    var resultValue = cells[i].innerText.trim().toLowerCase(); // Convert to lowercase
    
    // Update background color based on the result value for each cell
    if (resultValue === 'w') {
      cells[i].style.backgroundColor = '#00e192'; // Green background for wins
    } else if (resultValue === 'l') {
      cells[i].style.backgroundColor = '#ff6666'; // Red background for losses
    } else {
      cells[i].style.backgroundColor = ''; // Reset background color for other results
    }

    // Update font color based on the result value
    cells[i].style.color = (resultValue === 'w' || resultValue === 'l') ? '#606060' : '#fff'; // Set text color based on cell content
  }
reorderRowsBasedOnWL()
  // Save data to localStorage
  saveTableData();
}
function reorderRowsBasedOnWL() {
  const tableBody = document.getElementById('tableBody');
  const rows = Array.from(tableBody.rows);

  // Assuming "W" or "L" is in the fourth column, index 3
  const rowsToMove = rows.filter(row => {
    const cellValue = row.cells[3].textContent.trim().toUpperCase();
    return cellValue === 'W' || cellValue === 'L';
  });

  // Move matching rows to the end
  rowsToMove.forEach(row => {
    tableBody.appendChild(row); // This moves the row to the end of the table
  });
}
// Function to add a new row to the table
function addRow() {
  var tableBody = document.getElementById('tableBody');
  var newRow = tableBody.insertRow(-1); // Add a new row at the end of the table


  for (let i = 0; i < 4; i++) {
    var newCell = newRow.insertCell(i);
    newCell.contentEditable = true; // Make the cell editable
    newCell.addEventListener('input', function() {
      updateStyling(newRow);
       reorderRowsBasedOnWL();
    });
  }
}
// Function to update the styling for existing rows
function updateStylingForExistingRows() {
  var tableBody = document.getElementById('tableBody');

  // Loop through existing rows and update styling
  for (var i = 0; i < tableBody.rows.length; i++) {
    updateStyling(tableBody.rows[i]);
    reorderRowsBasedOnWL()

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
     reorderRowsBasedOnWL();
  }
}


// Function to load data from localStorage
function loadTableData() {
  var tableData = localStorage.getItem('tableData');
  if (tableData) {
    tableData = JSON.parse(tableData);
    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    for (var i = 0; i < tableData.length; i++) {
      var newRow = tableBody.insertRow(-1);
      for (var j = 0; j < tableData[i].length; j++) {
        var newCell = newRow.insertCell(j);
        newCell.innerHTML = tableData[i][j];
        newCell.contentEditable = true;
        // Bind the current row to the event listener using a closure
        newCell.addEventListener('input', createInputListener(newRow));
      }
      updateStyling(newRow); // Immediately apply styling based on loaded data
      reorderRowsBasedOnWL()
    }
  }
}

// Create a function to return an event listener that has the correct row in its closure
function createInputListener(row) {
  return function() {
    updateStyling(row);
  };
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
   reorderRowsBasedOnWL();
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Assume you have a function to populate the table
    populateTableWithData(); // This populates the table
    reorderRowsBasedOnWL(); // Then reorder rows based on W or L
});
