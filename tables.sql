CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(11) NOT NULL CHECK (phone ~ '^[0-9]{10,11}$'),
  password VARCHAR(250) NOT NULL
);


CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(11) NOT NULL CHECK (phone ~ '^[0-9]{10,11}$'),
  password VARCHAR(250) NOT NULL,
  specialty VARCHAR(50)
);


CREATE TABLE available_times (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES doctors(id),
  available BOOLEAN DEFAULT TRUE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL CHECK (date_trunc('minute', end_time) = end_time AND extract(minute from (end_time - start_time)) = 20)
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES doctors(id),
  patient_id INTEGER REFERENCES patients(id),
  time INTEGER REFERENCES available_times(id),
  confirmed BOOLEAN DEFAULT false,
  finished default false,
);

CREATE TABLE doctor_sessions (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES doctors(id),
  token VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE patient_sessions (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patients(id),
  token UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

