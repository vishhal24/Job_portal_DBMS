import main from '../utils/db.js';

async function createApplicationTable() {
    const connection = await main();
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS applications (
            application_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            job_id INT NOT NULL,
            status ENUM('applied', 'shortlisted', 'rejected', 'hired') DEFAULT 'applied',
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE,
            UNIQUE KEY unique_application (user_id, job_id) -- prevent duplicate applications
        );
    `);
    console.log('✅ Application table ready');
}

export default createApplicationTable;
