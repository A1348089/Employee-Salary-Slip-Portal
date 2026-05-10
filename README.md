# Employee Salary Slip Portal

A responsive frontend web application built using HTML, Bootstrap, JavaScript, and SheetJS that allows employees to securely search and download their salary slips using their Employee ID and Mobile Number.

The application reads employee data directly from an Excel file (`employee_salary_slips.xlsx`) without requiring any backend or database. Salary slip PDFs are dynamically fetched and made available for download through a clean dashboard interface.

---

## Features

- Employee login using:
  - Employee ID
  - Mobile Number
- Dynamic employee dashboard
- Read employee data directly from Excel sheet
- Salary slip PDF download functionality
- Responsive modern UI using Bootstrap 5
- No backend required
- GitHub Pages compatible

---

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- SheetJS (XLSX Library)

---

## Excel File Structure

The application reads data from:

```text
employee_salary_slips.xlsx

Required columns:
emid | name | monile number | pdflink

Example:
EMP1023 | Ravi Kumar | 9876543210 | salary_slips/Salary_Slip_May_2024.pdf

Project Structure

project/
│
├── index.html
├── style.css
├── script.js
├── employee_salary_slips.xlsx
│
└── salary_slips/
    ├── emp1.pdf
    ├── emp2.pdf
    └── ...
How It Works
Employee enters Employee ID and Mobile Number
JavaScript reads the Excel file
Employee details are matched dynamically
Dashboard displays employee information
Salary slip PDF becomes available for download

Setup Instructions
Clone the repository
git clone <repository-url>
Place your salary slip PDFs inside:
salary_slips/
Update employee data inside:
employee_salary_slips.xlsx
Open index.html in browser

OR

Deploy using GitHub Pages.

Live Demo

Hosted using GitHub Pages.

Future Improvements
Backend authentication
Database integration
OTP verification
Admin dashboard
Secure salary slip access
Django backend integration
Author

PUTTAMANENI ARAVIND
Python Django Developer

LinkedIn: www.linkedin.com/in/p-aravind-04468624b/
Email: paravind8811@gmail.com