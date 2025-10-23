import main from '../utils/db.js';

async function createCompanyTable() {
    const connection = await main();
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS company (
            company_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id int not null,
            name VARCHAR(255) NOT NULL unique,
            website varchar(255),
            email VARCHAR(255) UNIQUE ,
            phone_number VARCHAR(15),
            location VARCHAR(255),
            logo varchar(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            foreign key ( user_id) references users(user_id) on delete cascade
        )
    `);
    console.log('✅ company table ready');
}

export default createCompanyTable;
