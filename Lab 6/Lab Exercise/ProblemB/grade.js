/*
List of errors:

1. Error (grade.html, Line 9): The form did not return the function result,
   so the page could refresh after submission. Fixed with return checkMark(event).
2. Error (grade.html, Line 19): The script filename was grades.js, but the
   required file is grade.js. Fixed the filename.
3. Error (grade.js, Line 5): A single = assigned an empty value instead of
   comparing the name. Fixed by using ===.
4. Error (grade.js, Line 9): isNan() used incorrect capitalization.
   JavaScript uses isNaN().
5. Error (grade.js, Line 14): The condition used &&, which can never reject
   a number for being both below 0 and above 100. Fixed with ||.
6. Error (grade.js, Line 28): getElementByID() used incorrect capitalization.
   The correct method is getElementById().
7. Error (grade.js, Line 30): The property colour was misspelled.
   JavaScript uses style.color.
8. Error (grade.js, Line 34): showTable() and showtable() did not match
   because JavaScript function names are case-sensitive. Both now use showTable().
9. Error (grade.js, Line 38): The loop started at 1 and skipped grade A.
   Fixed by starting at 0.
10. Error (grade.js, Line 42): innerHtml was incorrectly capitalized.
    The correct property is innerHTML.
*/

// Check the student's name and mark, then display the grade.
function checkMark(event) {
    // Stop the form from refreshing the page after submission.
    if (event) {
        event.preventDefault();
    }

    // Read the values entered in the form.
    let name = document.forms["gradeForm"]["name"].value.trim();
    let markInput = document.forms["gradeForm"]["mark"].value.trim();

    // Validate that the name is not empty.
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Validate that the mark is not empty.
    if (markInput === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check that the mark is a valid number.
    if (isNaN(markInput)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert the mark to a number.
    let mark = Number(markInput);

    // Check that the mark is within the range 0 to 100.
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine the grade using if...else statements.
    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Display the student's name and grade.
    document.getElementById("result").innerHTML =
        name + " got grade " + grade;

    // Change the result colour based on the grade.
    if (grade === "A" || grade === "B") {
        document.getElementById("result").style.color = "green";
    } else if (grade === "C") {
        document.getElementById("result").style.color = "orange";
    } else {
        document.getElementById("result").style.color = "red";
    }

    // Display the date and time when the grade was checked.
    document.getElementById("checkedTime").innerHTML =
        "Checked on: " + new Date();

    // Return false to prevent the form from reloading the page.
    return false;
}

// Put a random whole-number mark from 0 to 100 into the mark field.
function randomMark() {
    let randomNumber = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomNumber;
}

// Display the grade reference table.
function showTable() {
    // Store the grade names and their mark ranges in arrays.
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    // Create the table heading.
    let tableHTML = "<table>";
    tableHTML += "<tr><th>Grade</th><th>Mark Range</th></tr>";

    // Use a for loop to add all four grades to the table.
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" +
            ranges[i] + "</td></tr>";
    }

    // Close the table and display it on the page.
    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
