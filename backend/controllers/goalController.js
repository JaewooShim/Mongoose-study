// !!!!!!!!!! When we use mongoose and use functions to interact w/ database
// We get a prmoise!!!!!!!!!!!!!!

const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const Goal = require('../models/goalModel');

// @desc    Get goals
// @route   Get /api/goals
// @access  Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find();

    res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }
    const goals = await Goal.create({
        text: req.body.text
    });

    res.status(200).json(goals);
});

// @desc    update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    res.status(200).json(updatedGoal);
});

// @desc    delete goal
// @route   DELETE /api/goals/:id
// @access  Private
// const deleteGoal = asyncHandler(async(req, res) => {
//     const goal = await Goal.findById(req.params.id);

//     if (!goal) {
//         res.status(400);
//         throw new Error('Goal not found');
//     }
//     // const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
//     await goal.remove();
//     res.status(200).json({ id: req.params.id });
// });
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
  
    if (!goal) {
      res.status(400)
      throw new Error('Goal not found')
    }
    await goal.deleteOne();
  
    res.status(200).json({ id: req.params.id })
  })

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal 
}