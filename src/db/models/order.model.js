const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRODUCT_TABLE } = require('./product.model');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customerid',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'productid',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createat: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'createat',
    defaultValue: Sequelize.NOW,
  },
  amount: {
    allowNull: false,
    autoIncrement: false,
    type: DataTypes.FLOAT
  },

}


class Order extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
  }
  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'product',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
