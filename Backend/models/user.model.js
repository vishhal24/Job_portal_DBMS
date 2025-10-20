import main from '../utils/db.js';

async function createUserTable() {
    const connection = await main();
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INT PRIMARY KEY AUTO_INCREMENT,
            fullname VARCHAR(255) NOT NULL DEFAULT 'Unknown',
            email VARCHAR(255) NOT NULL,
            phoneNumber VARCHAR(10) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM('recruiter', 'student') NOT NULL DEFAULT 'student',
            bio TEXT,
            skill TEXT,
            resume VARCHAR(255) DEFAULT 'not_uploaded.pdf',
            resumeOriginal VARCHAR(50) DEFAULT 'N/A'
        )
    `);
    console.log('✅ Users table ready');
}

export default createUserTable;
