const IncomeSchema = require("../models/incomeModel")


exports.addIncome = async (req, res) => {
    const { title, description, amount, category, date } = req.body
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message: "Please add all fields"})
        }
        if (amount <= 0 || !amount === "number") {
            return res.status(400).json({ message: "Amount must be positive number" });
        }
        await income.save()
        res.status(200).json({ message: "Income added successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params
    IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({message: "Income deleted successfully"})
    })
    .catch((error) => {
        res.status(500).json({message: "Server Error"})
    })
};