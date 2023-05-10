const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

// const contactsPath = path.join(__dirname, "db", "contacts.json");
const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data) || null;
};

const getContactById = async (id) => {
  try {
    const contactId = String(id);
    const contacts = await listContacts();
    const result = contacts.find((c) => c.id === contactId);
    return result || null;
  } catch (e) {
    console.error(`Error reading contacts data: ${e}`);
  }
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateById = async (id, data) => {
  const contactId = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((i) => i.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await updateContacts(contacts);
  return contacts[index];
};

const removeContact = async (id) => {
  const contactId = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((i) => i.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeContact,
};
