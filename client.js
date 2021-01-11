console.log('JS linked');

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
    });

    $('#employeeList').on('click', '.dlt-emp-button', function (event) {

        //Use the target of the events ancestors to target and remove the row that the data resides in.
        employees.splice(($(event.target).parent().parent().attr('arraypos')), 1);

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

    $('#tableFooter').append(
        `<tr>
             <td></td>
             <td></td>
             <td></td>
            <td><h3>Monthly Payroll: </h3></td>
            <td style='font-size: 1.5em;'>$ ${monthlyPayroll}</td>
        </tr>`
    );
}
