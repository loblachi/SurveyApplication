import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('defaultdb', 'avnadmin', 'AVNS_0o_inS-XRLwcTTSp3iD', {
  host: 'survey-db-survey-database.g.aivencloud.com',
  port: 23414,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      // Aiven requires SSL, so you enable it here:
      require: true,
      rejectUnauthorized: true
    }
  },
  logging: false // optional: turn off SQL query logging
});

export default sequelize;
