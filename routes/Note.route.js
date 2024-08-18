const express = require("express");
const { NoteModel } = require("../models/Note.model");

const noteRouter = express.Router();


noteRouter.get("/", async(req, res) => {
    // const payload  = req.body;
    try {
        const allNotes = await NoteModel.find();
        res.send(allNotes)
    } catch (err) {
        console.log(err);
        console.log({"msg": "Please Login First"});
    }
});

noteRouter.post("/create", async(req, res) => {
    const payload = req.body;
    try {
        const newNote = new NoteModel(payload);
        await newNote.save();
        res.send("Note Created")
    } catch (err) {
        console.log(err);
        res.send({"err":"Note Can't be Created"})
    }
})

noteRouter.patch("/update/:id", async(req, res) => {
    const payload = req.body;
    const id = req.params.id;
    const note = await NoteModel.findOne({"_id": id})
    //console.log("note", note);
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;

    try {
        if(userID_making_req !== userID_in_note) {
            res.send({"msg": "You're Not Authorized"})
        }
        else {
            await NoteModel.findByIdAndUpdate({"_id": id}, payload)
            res.send("Note Updated");
        }
    } catch (err) {
        console.log(err);
        console.log({"msg": "Can't Update the Note"});
    }
})

noteRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;
    const note = await NoteModel.findOne({"_id": id})
    //console.log("note", note);
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;

    try {
        if(userID_making_req !== userID_in_note) {
            res.send({"msg": "You're Not Authorized"})
        }
        else {
            await NoteModel.findByIdAndDelete({"_id": id})
            res.send("Note Deleted");
        }
    } catch (err) {
        console.log(err);
        console.log({"msg": "Can't Delete the Note"});
    }
})

module.exports = {
    noteRouter
};