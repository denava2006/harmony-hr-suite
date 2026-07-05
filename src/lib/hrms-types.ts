// TypeScript row shapes that mirror the tables created in
// db/migrations/0001_hrms_core.sql. Kept in sync by hand — update both files
// together when you add/rename a column.

// A department = an organizational unit (e.g. "Engineering", "HR").
export interface Department {
  id: string;
  code: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Position {
  id: string;
  department_id: string | null;
  title: string;
  level: string | null;
  salary_grade: number | null;
  created_at: string;
}

export interface Employee {
  id: string;
  user_id: string | null;
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  gender: string | null;
  birth_date: string | null;
  address: string | null;
  department_id: string | null;
  position_id: string | null;
  hire_date: string;
  status: string;
  pos_enabled: boolean;
  created_at: string;
  updated_at: string;
}
