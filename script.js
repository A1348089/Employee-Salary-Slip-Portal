async function loadExcelData() {
    const response = await fetch("./employee_salary_slips.xlsx");

    if (!response.ok) {
        throw new Error("Unable to load employee_salary_slips.xlsx");
    }

    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, {
        type: "array"
    });

    const firstSheet = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheet];

    const rows = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
        raw: false
    });

    // Normalize Excel headers to avoid case and whitespace issues.
    return rows.map(row => {
        const normalized = {};

        for (const [key, value] of Object.entries(row)) {
            normalized[key.trim().toLowerCase()] = String(value).trim();
        }

        return normalized;
    });
}

async function loginEmployee() {
    const employeeId = document
        .getElementById("employeeId")
        .value.trim();

    const mobileNumber = document
        .getElementById("mobileNumber")
        .value.trim();

    const messageBox = document.getElementById("messageBox");

    if (!employeeId || !mobileNumber) {
        messageBox.textContent =
            "Please enter both Employee ID and Mobile Number.";
        return;
    }

    try {
        const employees = await loadExcelData();

        const employee = employees.find(emp =>
            emp["emid"] === employeeId &&
            emp["mobile number"] === mobileNumber
        );

        if (!employee) {
            messageBox.textContent =
                "Employee not found. Please verify your details.";
            return;
        }

        const pdfLink = employee["download link"];

        if (!pdfLink) {
            messageBox.textContent =
                "Employee found, but no salary slip is available.";
            return;
        }

        // Update employee dashboard.
        document.getElementById("headerEmployeeId").textContent =
            employee["emid"];

        document.getElementById("employeeNameTitle").textContent =
            `Hello, ${employee["name"]}`;

        document.getElementById("employeeIdValue").textContent =
            employee["emid"];

        document.getElementById("employeeNameValue").textContent =
            employee["name"];

        document.getElementById("mobileValue").textContent =
            employee["mobile number"];

        // Configure salary slip links.
        const salaryFileName = document.getElementById("salaryFileName");
        const downloadButton = document.getElementById("downloadButton");

        salaryFileName.textContent = pdfLink.split("/").pop();
        salaryFileName.href = pdfLink;
        salaryFileName.target = "_blank";
        salaryFileName.rel = "noopener noreferrer";

        downloadButton.href = pdfLink;
        downloadButton.target = "_blank";
        downloadButton.rel = "noopener noreferrer";

        messageBox.textContent =
            "Login successful. Your salary slip is ready.";

    } catch (error) {
        console.error("Employee login error:", error);

        messageBox.textContent =
            "Unable to load employee data. Please try again.";
    }
}

function resetDashboard() {
    document.getElementById("employeeId").value = "";
    document.getElementById("mobileNumber").value = "";

    document.getElementById("headerEmployeeId").textContent = "None";
    document.getElementById("employeeNameTitle").textContent = "Hello, None";
    document.getElementById("employeeIdValue").textContent = "None";
    document.getElementById("employeeNameValue").textContent = "None";
    document.getElementById("mobileValue").textContent = "None";

    const salaryFileName = document.getElementById("salaryFileName");
    salaryFileName.textContent = "None";
    salaryFileName.removeAttribute("href");
    salaryFileName.removeAttribute("target");

    const downloadButton = document.getElementById("downloadButton");
    downloadButton.href = "#";
    downloadButton.removeAttribute("target");

    document.getElementById("messageBox").textContent =
        "Search employee using Employee ID and Mobile Number.";
}

// Register the login handler once.
document
    .querySelector(".login-btn")
    .addEventListener("click", loginEmployee);
