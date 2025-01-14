const {Sequelize, DataTypes, Model} = require('sequelize')

const init = require('./init.js')
sequelize = init.connect()

class Setting extends Model {}

Setting.init(
  {
    key: {
      type: DataTypes.TEXT,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.JSON,
      defaultValue: {},
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: 'Setting',
    tableName: 'settings', // Our table names don't follow the sequelize convention and thus must be explicitly declared
    timestamps: false,
  },
)

// Theme
exports.readTheme = async function () {
  try {
    const settings = await Setting.findAll({
      where: {
        key: 'theme',
      },
    })
    console.log('All theme settings:', JSON.stringify(settings, null, 2))
    return settings[0]
  } catch (error) {
    console.error('Could not find theme in the database: ', error)
  }
}

exports.updateTheme = async function (value) {
  try {
    await Setting.update(
      {value},
      {
        where: {
          key: 'theme',
        },
      },
    )
    console.log('Theme updated successfully.')
  } catch (error) {
    console.error('Error updating the theme: ', error)
  }
}

// SMTP
exports.readSMTP = async function () {
  try {
    const smtp = await Setting.findAll({
      where: {
        key: 'smtp',
      },
    })
    console.log('All smtp settings:', JSON.stringify(smtp, null, 2))
    return smtp[0]
  } catch (error) {
    console.error('Could not find organization name in the database: ', error)
  }
}

exports.updateSMTP = async function (value) {
  try {
    await Setting.update(
      {value},
      {
        where: {
          key: 'smtp',
        },
      },
    )
    console.log('SMTP updated successfully.')
  } catch (error) {
    console.error('Error updating the SMTP: ', error)
  }
}

// Organization
exports.readOrganization = async function () {
  try {
    const organization = await Setting.findAll({
      where: {
        key: 'organization',
      },
    })
    console.log(
      'All organization settings:',
      JSON.stringify(organization, null, 2),
    )
    return organization[0]
  } catch (error) {
    console.error('Could not find organization name in the database: ', error)
  }
}

exports.updateOrganization = async function (value) {
  try {
    await Setting.update(
      {value},
      {
        where: {
          key: 'organization',
        },
      },
    )
    console.log('Organization name updated successfully.')
  } catch (error) {
    console.error('Error updating the organization name: ', error)
  }
}
