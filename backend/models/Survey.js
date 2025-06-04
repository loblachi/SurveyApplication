import { DataTypes } from 'sequelize';

const SurveyModel = (sequelize) => {
  return sequelize.define('Survey', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favFoodsArr: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    radioAnswers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
};

export default SurveyModel;