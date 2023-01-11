import React, { useState, useEffect } from 'react';
import ListItem from './components/ListItem';
import AddEmployee from './components/AddEmployee/AddEmployee';


export default function() {

    const [employees, setEmployees] = useState();
    const [employeeSelected, setEmployeeSelected] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const staff = await getEmployees();
            setEmployees(staff);
        };
        fetchData().catch(console.error);
    },[]);

    async function getEmployees() {
        return fetch("/employees").then(response => response.json());
    }

    async function createEmployee(name, value) {
        return fetch("/employees", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    async function updateEmployee(name, value) {
        return fetch("/employees", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    const onSelectEmployee = (employee) => {
        if (employeeSelected === employee) {
            setEmployeeSelected();
        } else {
            setEmployeeSelected(employee);
        }
    }

    const onEditSubmit = async (value) => {
        const response = await updateEmployee(employeeSelected.name, value);
        onUpdateEmployees()
    };

    const onCreateNew = async (name, value) => {
        const response = await createEmployee(name, value);
        onUpdateEmployees()
    }

    const onUpdateEmployees = async () => {
        const peeps = await getEmployees();
        setEmployees(peeps);
      }
 
      return (
        <section>
          <AddEmployee onCreateNew={onCreateNew}/>
          {employees && <p>Employee Count: {employees.length}</p>}
          {employees &&
            employees.map((employee, index) => {
              return (
                <ListItem
                  employee={employee}
                  employeeSelected={employeeSelected}
                  onSelectEmployee={onSelectEmployee}
                  key={index}
                  onEditSubmit={onEditSubmit}
                />
              );
            })}
        </section>
      );
    }
