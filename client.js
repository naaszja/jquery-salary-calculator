console.log('JS linked');


//I really like Blaine's checklists that he makes....so I borrowed this one. All credit to Blaine.
/*
   1. [ ] Create the html structure
   2. [ ] Capture the input when the user clicks the button
   3. [ ] Create a new employee object (for practice) when the data is captured
   4. [ ] Add that employee to the DOM, and to the global array (for later use)
   5. [ ] Add the salary to the global running total
   6. [ ] Calculate the monthly salary
   7. [ ] Update the DOM with the new monthly salary
   8. [ ] If the Salary > $20k, make the text red
   9. [ ] Add a delete button to the employee row
   10. [ ] Delete button removes the row from the DOM
   11. [ ] STRETCH: Delete also updates the monthly salary amount
*/

//Global array to hold the 'employee' objects
const employees = [];

//Declare variable to hold total annual payroll
let annualAnnualPayroll = 0;

$(onReady)

function onReady() {
    console.log('JQ linked');

    //Cick handler for add-emp-button
    $('#add-emp-button').on('click', newEmployee);

    $('#employeeList').on('click', '.dlt-emp-button', function (event) {

        //Use the target of the events ancestors to target and remove the row that the data resides in.
        employees.splice(($(event.target).parent().parent().attr('arrayposd')), 1);

        //Clear dom to keep display current/
        $('#empTable-body').empty();

        //Zero out payroll to keep it up to day with the current array
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

            // call our reusable function by passing in the 3
            // values from the cohort object
            appendDOM(firstName, lastName, idNumber, jobTitle, annualSalary);
        }
    })
}

function newEmployee() {
    const firstName = $('#empFirstName').val();
    const lastName = $('#empLastName').val();
    const idNumber = $('#empID').val();
    const jobTitle = $('#empTitle').val();
    const annualSalary = $('#empSalary').val();


    //Create an employee object from the user input then push the employee to the employees array
    function addEmployee(firstName, lastName, idNumber, jobTitle, annualSalary) {
        employees.push({
            firstName: firstName,
            lastName: lastName,
            idNumber: idNumber,
            jobTitle: jobTitle,
            annualSalary: annualSalary
        })
    }

    //Clear dom to keep display current/
    $('#empTable-body').empty();

    //Zero out payroll to keep it up to day with the current array
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

        // call our reusable function by passing in the 3
        // values from the cohort object
        appendDOM(firstName, lastName, idNumber, jobTitle, annualSalary);
    }
};

function appendDOM(fName, lName, id, title, salary) {

    $('#empTable-body').append(
        `<tr>
            <td>${fName}</td>
            <td>${lName}</td>
            <td>${id}</td>
            <td>${title}</td>
            <td>${salary}</td>
            <td class='dlt-emp-button' width='15%'>Delete Employee</td>
        </tr>`
    );

    $('#tableFooter').empty()

    if (monthlyPayroll > 20000) {
        $('#monthOut').addClass('monthly-too-high');
    } else if (monthlyPayroll < 20000) {
        $('#monthOut').removeClass('monthly-too-high');
    }

    $('#tableFooter').append(
        `<tr>
             <td></td>
             <td></td>
             <td></td>
            <td colSpan='5'><h3>Monthly Payroll: </h3></td>
            <td id='monthOut'>$ ${monthlyPayroll}</td>
        </tr>`
    );
}
