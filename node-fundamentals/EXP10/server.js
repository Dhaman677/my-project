const readline = require("readline");

let employees = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("\n=== Employee Management System ===");
  console.log("1. Add Employee");
  console.log("2. List Employees");
  console.log("3. Remove Employee by ID");
  console.log("4. Exit");

  rl.question("Choose an option (1-4): ", (choice) => {
    switch (choice.trim()) {
      case "1":
        addEmployee();
        break;
      case "2":
        listEmployees();
        break;
      case "3":
        removeEmployee();
        break;
      case "4":
        console.log("Exiting... Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid option. Please choose again.");
        showMenu();
    }
  });
}

function addEmployee() {
  rl.question("Enter Employee ID: ", (id) => {
   
    if (employees.some((emp) => emp.id === id)) {
      console.log("❌ Employee ID already exists. Try again.");
      return showMenu();
    }

    rl.question("Enter Employee Name: ", (name) => {
      employees.push({ id, name });
      console.log(`✅ Employee added: { ID: ${id}, Name: ${name} }`);
      showMenu();
    });
  });
}

function listEmployees() {
  console.log("\n📋 Employee List:");
  if (employees.length === 0) {
    console.log("No employees found.");
  } else {
    employees.forEach((emp, index) => {
      console.log(`${index + 1}. ID: ${emp.id}, Name: ${emp.name}`);
    });
  }
  showMenu();
}

function removeEmployee() {
  rl.question("Enter Employee ID to remove: ", (id) => {
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1) {
      console.log("❌ Employee not found.");
    } else {
      const removed = employees.splice(index, 1);
      console.log(`🗑️ Removed Employee: { ID: ${removed[0].id}, Name: ${removed[0].name} }`);
    }
    showMenu();
  });
}

showMenu();
