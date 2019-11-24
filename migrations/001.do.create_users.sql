CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    password TEXT NOT NULL,
    house_number TEXT NOT NULL,
    apartment_number TEXT,
    street_name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    verified BOOLEAN DEFAULT FALSE NOT NULL
);

INSERT INTO users
(first_name, last_name, email, mobile_number, password, house_number, street_name, city, state, zip_code)
VALUES
('Jason', 'Carcamo', 'jasoncarcamo30@yahoo.com', '11', '$2a$12$5j.0uYz/QMJsNs4yXZYZeu7ssmiIQKugHUfXxFseZLawIg.bpvKDW', '11', 'Rodney pl', 'Amityville', 'Ny', '11701'),
('Jason', 'Carcamo', 'jasoncarcamo30@yahoo.com', '22', '$2a$12$5j.0uYz/QMJsNs4yXZYZeu7ssmiIQKugHUfXxFseZLawIg.bpvKDW', '11', 'Rodney pl', 'Amityville', 'Ny', '11701'),
('Jason', 'Carcamo', 'jasoncarcamo30@yahoo.com', '33', '$2a$12$5j.0uYz/QMJsNs4yXZYZeu7ssmiIQKugHUfXxFseZLawIg.bpvKDW', '11', 'Rodney pl', 'Amityville', 'Ny', '11701');