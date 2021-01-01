const sql = require('mysql');
const inquirer = require('inquirer');
const connection = sql.createConnection({
    host: "localhost",
    
    port: 3306,
   
    user: "root",
    
    password: "password",
    database: "employee_db"
});
connection.connect(err => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runSearch();
});
const runSearch = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Departments",
        "Add Roles",
        "Add Employees",
        "Update Roles",
        "View Departments",
        "View Roles",
        "View Employees",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add Departments":
        addDepartment();
        break;
      case "Add Roles":
        addRoles();
        break;
      case "Add Employees":
        addEmployees();
        break;
      case "Update Roles":
        updRoles();
        break;
      case "View Departments":
        viewDept();
        break;
      case "View Roles":
        viewRoles();
        break;
      case "View Employees":
        viewEmp();
        break;
      case "exit":
        connection.end();
        break;
      }
    });
}
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "Please input the name of the department."
      },
    ])
    .then(function(answer) {
      var query = "INSERT INTO employees SET ?";
      connection.query(query, { department: answer.department }, function(err, res) {
        if (err) throw err;
         runSearch();
      });
    });
  };

const addRoles = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please input the name of the role."
      },
    ])
    .then(function(answer) {
      var query = "INSERT INTO employees SET ?";
      connection.query(query, { title: answer.title }, function(err, res) {
        if (err) throw err;
          runSearch();
      });
    });
  };

const addEmployees = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Please input the id for this employee."
      },
      {
        name: "first_name",
        type: "input",
        message: "Please input first name."
      },
      {
        name: "last_name",
        type: "input",
        message: "Please input last name."
      },
      {
        name: "title",
        type: "input",
        message: "Please input role name."
      },
      {
        name: "department",
        type: "input",
        message: "Please input department name."
      },
      {
        name: "salary",
        type: "input",
        message: "Please input salary."
      },
      {
        name: "manager",
        type: "input",
        message: "Please input manager."
      },
    ])
    .then(function(answer) {
      var query = "INSERT INTO employees SET ?";
      connection.query(query, { id: answer.id, first_name: answer.first_name, last_name: answer.last_name, title: answer.title, department: answer.department, salary: answer.salary, manager: answer.manager}, function(err, res) {
        if (err) throw err;
          runSearch();
      });
    });
  };
  
const viewEmp = () => {
  inquirer
  .prompt({
      name: 'join',
      type: 'confirm',
      message: 'View Employees'
  })
  .then(answer => {
      const query = 'SELECT employees.id, employees.first_name, employees.last_name, employees.title, employees.department, employees.salary, employees.manager FROM employees'
      connection.query(query, [answer.join], (err, res) => {
          if (err) throw err;
          console.table(res);
          runSearch();
      });
  });
};

const viewDept = () => {
  inquirer
  .prompt({
      name: 'join',
      type: 'confirm',
      message: 'View Departments'
  })
  .then(answer => {
      const query = 'SELECT employees.department FROM employees'
      connection.query(query, [answer.join], (err, res) => {
          if (err) throw err;
          console.table(res);
          runSearch();
      });
  });
};

const viewRoles = () => {
  inquirer
  .prompt({
      name: 'join',
      type: 'confirm',
      message: 'View Roles'
  })
  .then(answer => {
      const query = 'SELECT employees.title FROM employees'
      connection.query(query, [answer.join], (err, res) => {
          if (err) throw err;
          console.table(res);
          runSearch();
      });
  });
};

const updRoles = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Please input the employees id."
      },
      {
        name: "first_name",
        type: "input",
        message: "What is the employees first name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employees last name?"
      },
    ])
  .then(function(answer) {
    connection.query(
      "UPDATE employees SET ? WHERE ? AND ?",
      [
        {
          id: answer.id
        },
        {
          first_name: answer.first_name
        },
        {
          last_name: answer.last_name
        },
      ],function(err, res) {
      if (err) throw err;
        runSearch();
    });
  });
};