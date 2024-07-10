const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
    .option("-a, --action [function]", "choose action")
    .option("-i, --id [number]", "user, id")
    .option("-n, --name [string]", "user name")
    .option("-e, --email [string]", "user email")
    .option("-p, --phone [string]", "user phone");


program.parse(process.argv);

const argv = program.opts();    

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
      break;

    case "get":
          const getContacts = await contacts.getContactsById(id);
          console.table(getContacts);
      break;

    case "add":
          const addContacts = await contacts.addContact(name, email, phone);
          console.table(addContacts);
      break;

    case "remove":
          const removeContacts = await contacts.removeContact(id);
          console.table(removeContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);