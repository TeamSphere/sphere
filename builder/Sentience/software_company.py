# software_company.py

from typing import List
from dataclasses import dataclass

@dataclass
class Employee:
    name: str
    role: str

class SoftwareCompany:
    def __init__(self):
        self.team = []

    def hire_employee(self, name: str, role: str):
        """Hire an employee and add them to the team."""
        employee = Employee(name, role)
        self.team.append(employee)

    def list_employees(self):
        """List all employees in the company."""
        return [employee.name for employee in self.team]

    def get_employee_roles(self):
        """List roles of all employees in the company."""
        return {employee.name: employee.role for employee in self.team}
