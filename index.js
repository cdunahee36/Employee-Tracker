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
      case "View Departments":
        queryBySong();
        break;
      case "View Roles":
        queryJoin();
        break;
      case "View Employees":
        queryJoin();
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
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].department);
        }
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
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].department);
        }
          runSearch();
      });
    });
  };

const addEmployees = () => {
  inquirer
    .prompt([
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
      connection.query(query, { first_name: answer.first_name, last_name: answer.last_name, title: answer.title, department: answer.department, salary: answer.salary, manager: answer.manager}, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("things");
        }
          runSearch();
      });
    });
  };
  
// const queryByMultipleEntries = () => {
//   var query = "SELECT artist FROM topsongs GROUP BY artist HAVING count(*) > 1";
//   connection.query(query, function(err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].artist);
//     }
//     runSearch();
//   });
// };
// const queryByRange = () => {
//   inquirer
//   .prompt([
//     {
//       name: "start",
//       type: "input",
//       message: "Enter starting position: ",
//       validate: function(value) {
//         if (isNaN(value) === false) {
//           return true;
//         }
//         return false;
//       }
//     },
//     {
//       name: "end",
//       type: "input",
//       message: "Enter ending position: ",
//       validate: function(value) {
//         if (isNaN(value) === false) {
//           return true;
//         }
//         return false;
//       }
//     }
//   ])
//   .then(function(answer) {
//     var query = "SELECT position,song,artist,year FROM topsongs WHERE position BETWEEN ? AND ?";
//     connection.query(query, [answer.start, answer.end], function(err, res) {
//       if (err) throw err;
//       for (var i = 0; i < res.length; i++) {
//         console.log(
//           "Position: " +
//             res[i].position +
//             " || Song: " +
//             res[i].song +
//             " || Artist: " +
//             res[i].artist +
//             " || Year: " +
//             res[i].year
//         );
//       }
//       runSearch();
//     });
//   });
// };
// const queryBySong = () => {
//   inquirer
//   .prompt({
//     name: "song",
//     type: "input",
//     message: "What song would you like to look for?"
//   })
//   .then(function(answer) {
//     console.log(answer.song);
//     connection.query("SELECT * FROM topsongs WHERE ?", { song: answer.song }, function(err, res) {
//       if (err) throw err;
//       console.log(
//         "Position: " +
//           res[0].position +
//           " || Song: " +
//           res[0].song +
//           " || Artist: " +
//           res[0].artist +
//           " || Year: " +
//           res[0].year
//       );
//       runSearch();
//     });
//   });
// };
// const queryJoin = () => {
//   inquirer
//   .prompt({
//       name: 'join',
//       type: 'input',
//       message: 'What artist would you like to search?'
//   })
//   .then(answer => {
//       const query = 'SELECT topsongs.artist, topsongs.year, topsongs.song, topalbums.song FROM topsongs INNER JOIN topalbums ON topsongs.year = topalbums.year AND topsongs.artist = topalbums.artist WHERE topsongs.artist = ?'
//       connection.query(query, [answer.join], (err, res) => {
//           if (err) throw err;
//           console.table(res);
//       });
//   });
// };