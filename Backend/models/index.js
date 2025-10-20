import createUserTable from "./user.model.js";
import createCompanyTable from "./company.model.js";
import createJobTable from "./job.model.js";
import createApplicationTable from "./applications.model.js";


async function initDB(){
    await createUserTable();
    await createCompanyTable();
    await createJobTable();
    await createApplicationTable();
}
export default initDB;