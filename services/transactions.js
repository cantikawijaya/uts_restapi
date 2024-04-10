// services/transactions.js
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// GET
async function getTransactions(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT id, customer_name, order_date, menu_items, total_amount, payment_method, order_status
      FROM transactions LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
      data,
      meta
    };
  } catch (error) {
    console.error('Error while getting transactions:', error);
    throw error;
  }
}

// POST
async function createMenu(menuData) {
  try {
    const result = await db.query(
      `INSERT INTO menu (name, price, description) 
      VALUES (?, ?, ?)`,
      [menuData.name, menuData.price, menuData.description]
    );

    let message = 'Error in creating menu';

    if (result.affectedRows) {
      message = 'Menu created successfully';
    }

    return { message };
  } catch (error) {
    console.error('Error while creating menu:', error);
    throw error;
  }
}

// PUT
async function updateMenu(id, menuData) {
  try {
    const result = await db.query(
      `UPDATE menu 
      SET name=?, price=?, description=? 
      WHERE id=?`,
      [menuData.name, menuData.price, menuData.description, id]
    );

    let message = 'Error in updating menu';

    if (result.affectedRows) {
      message = 'Menu updated successfully';
    }

    return { message };
  } catch (error) {
    console.error('Error while updating menu:', error);
    throw error;
  }
}

// DELETE
async function deleteMenu(id) {
  try {
    const result = await db.query(
      `DELETE FROM menu WHERE id=?`,
      [id]
    );

    let message = 'Error in deleting menu';

    if (result.affectedRows) {
      message = 'Menu deleted successfully';
    }

    return { message };
  } catch (error) {
    console.error('Error while deleting menu:', error);
    throw error;
  }
}

module.exports = {
  getTransactions,
  createMenu,
  updateMenu,
  deleteMenu,
};
