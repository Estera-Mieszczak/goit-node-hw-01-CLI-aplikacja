const { v4: uuidv4 } = require("uuid");

const fs = require('fs').promises;


const contactsPath = "./db/contacts.json";

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch (e) {
        console.log(e);
        console.log("Error:", e.message, "| Something went wrong when you tried to list contacts");
        return [];
    }
};

const getContactsById = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const searchedContact = contacts.filter(
            (contact) => contact.id === contactId,
        )[0];
        return searchedContact;
    } catch (e) {
        console.log(e);
        console.log("Error:", e.message, "| Something went wrong when you tried to get contacts");
        return null;
    }
};

const addContact = async (name, email, phone) => {

    const newContact = { id: uuidv4(), name, email, phone };
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const updatedContacts = [...contacts, newContact];
        const contactToAdd = JSON.stringify(updatedContacts);
        await fs.writeFile(contactsPath, contactToAdd);
        return updatedContacts;
    } catch (e) {
        console.log(e);
        console.log("Error:", e.message, "| Something went wrong when you tried to add contact");
        return [];
    }
};

const removeContact = async (contactId) => {
     try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    const updatedData = JSON.stringify(updatedContacts);
    await fs.writeFile(contactsPath, updatedData);
    return updatedContacts;
  } catch (error) {
    console.log(e);
    console.log("Error:", e.message, "| Something went wrong when you tried to remove contact")
    return [];
  }
};

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
};