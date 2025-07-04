//CRUD for Lending data handling
const mongoose = require('mongoose');
const Lending = require('../model/LendingModel')
const Member = require('../model/MemberModel')
const Book = require('../model/BookModel')

async function getAllLendings(){
    return Lending.find();
}

async function addLending(lending) {
    console.log(lending)
    try {
        const member = await Member.findOne({ memberId: lending.member });
        const book = await Book.findOne({ bookId: lending.book });

        if (!member) {
            throw new Error(`Member with ID ${lending.member} not found`);
        }

        if (!book) {
            throw new Error(`Book with ID ${lending.book} not found`);
        }

        // Check available quantity > 0
        if (book.availableQty <= 0) {
            throw new Error("Cannot proceed due to not enough available books");
        }

        // Proceed with lending
        book.avilableQty -= 1;
        await book.save();
        lending.isActiveLending = true;
        lending.overdueDays = 0;
        lending.fineAmount = 0;
        lending.returnDate = generateBookReturnDate();

        // Save the lending record
        const lendingData = new Lending(lending);
        await lendingData.save();

        return lendingData;
        
        
    } catch (err) {
        // Handle error (no need for rollback since there's no transaction)
        throw err; // Re-throw to be handled by your route/controller
    }
}


async function deleteLending(){
    return Lending.findOneAndDelete(lendingId)
}

async function updateLending(lendingId, lendingData){
    try{
        const book = await Book.findOne({ bookId: lending.book });
        const member = await Member.findOne({ memberId: lending.member });

        if (!member) {
            throw new Error(`Member with ID ${lending.member} not found`);
        }

        if (!book) {
            throw new Error(`Book with ID ${lending.book} not found`);
        }
      const lendingData =  Lending.findOneAndUpdate({ lendingId:lendingId},lendingData,{new : true})
      book.set





      return lendingData
    }catch(er){
        console.log(er)
    }
    


}

//generate return date and other utills

function generateBookReturnDate() {
    const today = new Date();
    const returnDate = new Date(today);
    returnDate.setDate(returnDate.getDate() + 7); // add 7 days
    return returnDate;
}

function calcOverDue(returnDateStr) {
    const today = new Date();
    const returnDate = new Date(returnDateStr);

    // Zero out the time for both dates (simulate LocalDate behavior)
    today.setHours(0, 0, 0, 0);
    returnDate.setHours(0, 0, 0, 0);

    if (returnDate < today) {
        const diffTime = today.getTime() - returnDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    return 0;
}


function calcFine(daysCount, perDayFineAmount) {
    return daysCount * perDayFineAmount;
}

module.exports = { getAllLendings, addLending, deleteLending,updateLending }