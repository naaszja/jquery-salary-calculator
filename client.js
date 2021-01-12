console.log('JS linked');


//I really like Blaine's checklists that he makes....so I borrowed this one. All credit
/*
   1. [√] Create the html structure
   2. [√] Capture the input when the user clicks the button
   3. [√] Create a new employee object (for practice) when the data is captured
   4. [√] Add that employee to the DOM, and to the global array (for later use)
   5. [√] Add the salary to the global running total
   6. [√] Calculate the monthly salary
   7. [√] Update the DOM with the new monthly salary
   8. [] If the Salary > $20k, make the text red
   9. [√] Add a delete button to the employee row
   10. [√] Delete button removes the row from the DOM
   11. [√] STRETCH: Delete also updates the monthly salary amount
*/

//Create array to hold employee objects
const employees = [];

//Declare variable to hold total payroll
let annualPayroll = 0;
let monthlyPayroll = 0;

$(onReady)

function onReady() {
    console.log('JQ linked');

    //Cick handler for add-emp-button
    $('#add-emp-button').on('click', function () {
        const firstName = $('#empFirstName').val();
        const lastName = $('#empLastName').val();
        const idNumber = Number($('#empID').val());
        const jobTitle = $('#empTitle').val();
        const annualSalary = Number($('#empSalary').val());


        //Create an employee object from the user input then push the employee to the employees array
        addEmployee(firstName, lastName, idNumber, jobTitle, annualSalary);

        //Clear form values
        $('#empFirstName').val('');
        $('#empLastName').val('');
        $('#empID').val('');
        $('#empTitle').val('');
        $('#empSalary').val('');

        //Clear dom to keep display current/
        $('#empTable-body').empty();

        //Zero out payroll to keep it up to day with the current array
        annualPayroll = 0;
        monthlyPayroll = 0;

        $('#empTable tbody').empty();   

        // loop employee array and display to the dom
        for (let emp of employees) {
            // Get the employee information
            let firstName = emp.firstName;
            let lastName = emp.lastName;
            let idNumber = emp.idNumber;
            let jobTitle = emp.jobTitle;
            let annualSalary = emp.annualSalary;

            //add each annual salary to the total payroll
            annualPayroll += annualSalary
            monthlyPayroll = (annualPayroll / 12);
            monthlyPayroll = monthlyPayroll.toFixed(2);
            
            // if (monthlyPayroll >= 20000) {
            //     $('#totalMonth').removeClass('.totalMonth-under20');
            //     $('#totalMonth').addClass('.totalMonth-over20');
            // }else if(monthlyPayroll < 20000) {
            //     // ('#totalMonth').removeClass('.totalMonth-over20');
            //     ('#totalMonth').addClass('.totalMonth-under20');
            // }

            // call our reusable function by passing in the 3
            // values from the cohort object
            appendDOM(firstName, lastName, idNumber, jobTitle, annualSalary);
        }
    });

    $('#empTable').on('click', '.dlt-emp-button', function (event) {

        //Get the id from the row clicked on so the employee can be removed from the array
        let id = Number($(event.target).parent().prev().prev().val());
        console.log(id);


        //Target the nearest ancestor 'tr' to delete after the click event
        $(event.target).closest('tr').remove();

        //Clear dom to keep display current/
        $('#empTable tbody').empty();

        // //Zero out payroll to keep it up to day with the current array
        annualPayroll = 0;
        monthlyPayroll = 0;

        // loop employee array and display to the dom
        for (let emp of employees) {
            // Get the employee information
            let firstName = emp.firstName;
            let lastName = emp.lastName;
            let idNumber = emp.idNumber;
            let jobTitle = emp.jobTitle;
            let annualSalary = emp.annualSalary;

            //add each annual salary to the total payroll
            annualPayroll += annualSalary
            monthlyPayroll = (annualPayroll / 12);
            monthlyPayroll = monthlyPayroll.toFixed(2);

            // call our reusable function by passing in values from the emplyee object(s)
            appendDOM(firstName, lastName, idNumber, jobTitle, annualSalary);
        }
    })
}

// Function to take input from the user and create a new employee object in the 'employees' array
function addEmployee(fName, lName, id, title, salary) {

    employees.push({
        firstName: fName,
        lastName: lName,
        idNumber: id,
        jobTitle: title,
        annualSalary: salary
    })
}

function appendDOM(fName, lName, id, title, salary) {

    //Add the new employee to the DOM
    $('#empTable tbody').append(
        `<tr>
            <td>${fName}</td>
            <td>${lName}</td>
            <td>${id}</td>
            <td>${title}</td>
            <td>${salary}</td>
            <td class='dlt-emp-button' width='15%'>Delete Employee</td>
        </tr>`
    );

    //Update the monthly salary total and append the DOM
    $('#totalMonth').empty().append(`$${monthlyPayroll}`)
}
