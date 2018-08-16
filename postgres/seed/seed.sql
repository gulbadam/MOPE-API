BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('lena', 'gulbadam@gulbadam.com', 19, '2018-06-26');
INSERT into login (hash, email) values ('$2a$10$nr/6CCFpN35cQbJHAm7VQO97DIsMkaWHg8z1lU.cq3m4ww73eu4pu', 'gulbadam@gulbadam.com');
COMMIT;
