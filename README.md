Script BDD 

-- Table des utilisateurs
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Utilisation de INT et AUTO_INCREMENT
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    admin BOOL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des images
CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- Utilisation de INT et AUTO_INCREMENT
    url VARCHAR(200),
    signature VARCHAR(200),
    description TEXT,
    user_id INT,  -- FK vers la table "user"
    -- Clé étrangère vers "user"
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
