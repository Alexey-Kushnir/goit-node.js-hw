const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

// const contactsPath = path.join(__dirname, "db", "contacts.json");
const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data) || null;
  } catch (e) {
    console.error(`Error reading contacts data: ${e}`);
  }
};

const getContactById = async (id) => {
  try {
    const contactId = String(id);
    const contacts = await listContacts();
    const result = contacts.find((c) => c.id === contactId);
    return result || null;
  } catch (e) {
    console.error(`Error reading contact data: ${e}`);
  }
};

const addContact = async (data) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (e) {
    console.error(`Error writing contact's data: ${e}`);
  }
};

const updateById = async (id, data) => {
  try {
    const contactId = String(id);
    const contacts = await listContacts();
    const index = contacts.findIndex((i) => i.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id, ...data };
    await updateContacts(contacts);
    return contacts[index];
  } catch (e) {
    console.error(`Error updating contact's data: ${e}`);
  }
};

const removeContact = async (id) => {
  try {
    const contactId = String(id);
    const contacts = await listContacts();
    const index = contacts.findIndex((i) => i.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
  } catch (e) {
    console.error(`Error removing contact: ${e}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeContact,
};
