import { createContext, useState, useContext, useEffect } from 'react';
import { MOCK_EMPLOYEES } from '../services/mockData';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load employees from localStorage on mount
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      setEmployees(MOCK_EMPLOYEES);
      localStorage.setItem('employees', JSON.stringify(MOCK_EMPLOYEES));
    }
    setLoading(false);
  }, []);

  // Save employees to localStorage whenever they change
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: `EMP${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setEmployees([...employees, newEmployee]);
    return newEmployee;
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(
      employees.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const getEmployeeById = (id) => {
    return employees.find((emp) => emp.id === id);
  };

  const searchAndFilter = (searchTerm, filters) => {
    return employees.filter((emp) => {
      const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = !filters.gender || emp.gender === filters.gender;
      const matchesStatus = filters.status === null || emp.isActive === filters.status;

      return matchesSearch && matchesGender && matchesStatus;
    });
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
        searchAndFilter,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within EmployeeProvider');
  }
  return context;
};
