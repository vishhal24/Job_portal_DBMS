import main from '../utils/db.js';

async function createJobTable() {
    const connection = await main();
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS jobs (
            job_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    salary DECIMAL(10,2),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(company_id) 
        ON DELETE CASCADE
    )
    `);
    console.log('✅ job table ready');
}

export default createJobTable;
