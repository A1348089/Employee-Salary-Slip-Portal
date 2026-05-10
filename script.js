async function loadExcelData() {
  const response = await fetch("employee_salary_slips.xlsx");

  const arrayBuffer = await response.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, {
    type: "array",
  });

  const firstSheet = workbook.SheetNames[0];

  const worksheet = workbook.Sheets[firstSheet];

  return XLSX.utils.sheet_to_json(worksheet);
}

async function loginEmployee() {
  const employeeId = document.querySelectorAll(".form-control")[0].value.trim();

  const mobileNumber = document
    .querySelectorAll(".form-control")[1]
    .value.trim();

  if (!employeeId || !mobileNumber) {
    alert("Please enter Employee ID and Mobile Number");

    return;
  }

  try {
    const employees = await loadExcelData();

    const employee = employees.find(
      (emp) =>
        String(emp.emid).trim() === employeeId &&
        String(emp["monile number"]).trim() === mobileNumber,
    );

    if (!employee) {
      alert("Employee not found");

      return;
    }

    // Update Dashboard Data
    document.querySelector(".hello-title").innerText =
      `Hello, ${employee.name}`;

    document.querySelector(".emp-code").innerText = employee.emid;

    const detailValues = document.querySelectorAll(".detail-value");

    detailValues[0].innerText = employee.emid;
    detailValues[1].innerText = employee.name;
    detailValues[2].innerText = employee["monile number"];

    const pdfLink = document.querySelector(".salary-file-link");

    pdfLink.innerText = employee.pdflink;

    pdfLink.href = employee.pdflink;

    const downloadButton = document.querySelector(".download-btn");

    downloadButton.onclick = function () {
      window.open(employee.pdflink, "_blank");
    };

    alert("Login Successful");
  } catch (error) {
    console.error(error);

    alert("Unable to read Excel file");
  }
}

// Attach Login Button Event

document.querySelector(".login-btn").addEventListener("click", loginEmployee);