//CRUD for Member data handling
const Member = require('../model/MemberModel')

async function getAllMembers(){
    return Member.find();
}

async function addMember(member){
    const memberData = new Member(member);
    return memberData.save();
}

async function deleteMember(memberId){
    return Member.findOneAndDelete(memberId)
}

async function updateMember(memberId, memberData){
    return Member.findOneAndUpdate({ memberId:memberId},memberData,{new : true})
}

module.exports = { getAllMembers, addMember, deleteMember,updateMember }