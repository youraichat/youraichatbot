import { DataSource, DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';
import "dotenv/config";

(async () => {
    const options: DataSourceOptions = {
        type: 'mysql',
        database: process.env.DB_NAME || "youraichatbot"
    };

    // Create the database with specification of the DataSource options
    await createDatabase({
        options
    });

    const dataSource = new DataSource(options);
    await dataSource.initialize();
    // do something with the DataSource
})();