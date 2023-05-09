// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
const argv = require("yargs").argv;

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log("Added contact:", newContact);
    case "updateById":
      const updateContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      return console.log("Updated contact:", updateContact);
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log("Deleted contact:", deleteContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
invokeAction(argv);
