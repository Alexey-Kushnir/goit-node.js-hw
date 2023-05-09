const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contacts = require("./db");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "read":
      const allContacts = await contacts.getAll();
      return console.log(allContacts);
    case "getById":
      const oneContact = await contacts.getById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.add({ name, email, phone });
      return console.log("Added contact:", newContact);
    case "updateById":
      const updateContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      return console.log("Updated contact:", updateContact);
    case "delete":
      const deleteContact = await contacts.deleteById(id);
      return console.log("Deleted contact:", deleteContact);
    default:
      return console.log("Unknown action");
  }
};
const arr = hideBin(process.argv);
const { argv } = yargs(arr);
// console.log(argv);
invokeAction(argv);

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }

// invokeAction({ action: "read" });
// invokeAction({ action: "getById", id: "1DEXoP8AuCGYc1YgoQ6hw" });
// invokeAction({
//   action: "add",
//   name: "Test",
//   email: "aaa@mail.com",
//   phone: "000 00 0",
// });
// invokeAction({
//   action: "updateById",
//   id: "bvqAOeovRz-MmzNHl87Gw",
//   name: "Test",
//   email: "aaa@mail.com",
//   phone: "11111111",
// });
// invokeAction({
//   action: "delete",
//   id: "bvqAOeovRz-MmzNHl87Gw",
// });

// const fs = require("fs/promises");

// const { error } = require("console");
// const users = require("./contacts");

// console.log(users);

// module.exports = {};

// const fileOperations = async () => {
//   const data = await fs.readFile("./db/contacts.json", "utf-8");
//   console.log(data);

// const text = data.toString();
// console.log(text);
// const data = await fs.readFile("./db/contacts.json");
// };

// fileOperations();

// fs.readFile("./db/contacts.json", (error, data) => {
//   console.log(error);
//   console.log(data);
// });

// fs.readFile("./db/contacts.json")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));clea

// const addText = async () => {
//   const result = await fs.appendFile("./db/contacts.json", "\nHello");
// };

// addText();

// const replaceText = async () => {
//   const result = await fs.writeFile("./db/contacts.json", "Hello");
//   console.log(result);
// };

// replaceText();
