const { program } = require("commander");
const contactsMethods = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsMethods.listContacts();
      return console.table(allContacts);
    case "get":
      const oneContact = await contactsMethods.getContactById(id);
      return console.log("Contact:", oneContact);
    case "add":
      const newContact = await contactsMethods.addContact({
        name,
        email,
        phone,
      });
      return console.log("Added contact:", newContact);
    case "update":
      const updateContact = await contactsMethods.updateById(id, {
        name,
        email,
        phone,
      });
      return console.log("Updated contact:", updateContact);
    case "remove":
      const deleteContact = await contactsMethods.removeContact(id);
      return console.log("Deleted contact:", deleteContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(options);
