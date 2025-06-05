import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Trev_Survey_Db', 'root', 'Trevlin23$', {
  host: 'localhost',
  dialect: 'mysql',
});


export default sequelize;
