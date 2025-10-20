import main from '../utils/db.js';

async function createCompanyTable() {
    const connection = await main();
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS company (
            company_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    location VARCHAR(255),
    logo varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('✅ company table ready');
}

export default createCompanyTable;
