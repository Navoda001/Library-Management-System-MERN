const express = require("express");
const router = express.Router();
const lendingService = require("../service/LendingService");
const res = require("express/lib/response");
const authTokenData = require('../middleWare/AuthToken')
const lendingUrl = "/lending";

router.get(lendingUrl, authTokenData, async (req, res) => {
    try {
        const allLendings = await lendingService.getAllMembers();

        // const filterBooks = allBooks.map(book =>({
        //     bookId: book.bookId,
        //     bookName: book.bookName,
        //     author: book.author,
        //     edition:book.edition,
        //     publisher:book.publisher,
        //     isbn:book.isbn,
        //     price: book.price,
        //     totalQty:book.totalQty,
        //     avilableQty:book.avilableQty,
        //     lastUpdateDate:book.lastUpdateDate,
        //     lastUpdateTime:book.lastUpdateTime
        // }));
        // console.log("Get all books ", filterBooks);
        res.json(allLendings)

    } catch (error) {
        res.status(500).json({ error: "Error fetching books" });
    }
});

// Create lending
router.post(lendingUrl, async (req, res) => {
    console.log("Lending request.....", req.body)
    try {
        await lendingService.addLending(req.body)
        return res.status(201).send("Saved lending Successfully")

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error")

    }
});

//delete  book
router.delete(lendingUrl + "/:id", async (req, res) => {
    try {
        const delMember = await memberService.deleteMember(req.params.id);
        if (!delMember) {
            return res.status(404).send("Member not found for delete")
        }
        return res.status(204).send();

    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error")
    }
})
//update 
router.patch(lendingUrl + "/:id", async (req, res) => {
    try {
        const updatedMember = await memberService.updateMember(req.params.id, req.body);
        if (!updatedMember) {
            return res.status(404).send("Member not found")
        }
        return res.status(204).send();
    } catch (err) {
        console.error(err)
        return res.status(500).send("Internal Server Error");
    }
})



module.exports = router; 