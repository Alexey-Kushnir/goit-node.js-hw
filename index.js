// const { error } = require("console");
// const obj = require("./contacts");
const fs = require("fs/promises");

// console.log(obj);

// module.exports = {};

// const fileOperations = async () => {
//   const data = await fs.readFile("./db/contacts.json", "utf-8");
//   console.log(data);

//   //   const data = await fs.readFile("./db/contacts.json");
//   //   const text = data.toString();
//   //   console.log(text);
// };

// fileOperations();

// fs.readFile("./db/contacts.json", (error, data) => {
//   console.log(error);
//   console.log(data);
// });

// fs.readFile("./db/contacts.json")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// const addText = async () => {
//   const result = await fs.appendFile("./db/contacts.json", "\nHello");
// };

// addText();

const replaceText = async () => {
  const result = await fs.writeFile("./db/contacts.json", "Hello");
  console.log(result);
};

// replaceText();
