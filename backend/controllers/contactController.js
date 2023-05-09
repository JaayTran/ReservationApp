import Contact from "../models/contactModel.js";

//for fetch all
export const getAllContactController = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).send(contact);
  } catch (error) {
    console.log(error);
  }
};

//fetch specific
export const getContactController = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

//for add
export const createContactController = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).send("Contact Created Successfully!");
  } catch (error) {
    console.log(error);
  }
};

//for update
export const updateContactController = async (req, res) => {
  try {
    await Contact.findOneAndUpdate({ _id: req.body.contactId }, req.body, {
      new: true,
    });
    res.status(201).json("Contact Updated!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//for delete
export const deleteContactController = async (req, res) => {
  try {
    await Contact.findOneAndDelete({ _id: req.body.contactId });
    res.status(200).json("Contact Deleted!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
