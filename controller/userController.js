const { ObjectId } = require('mongoose').Types;
const { Student } = require('../../../Notes/miniprojects/week18miniproject/Main/models');
const { User, Thought } = require('../models');

// const userCount = async () => {
//     const numberOfUsers = await User.aggregate()
//         .count('friendCount');
//     return numberOfUsers;
// }

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                // userCount: await userCount(),
            };
            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: ' No User with that ID!' })
            }

            res.json({
                user,
                Thought,
                // friendCount: await userCount(),
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req,res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id : req.params.userId},
                { $set: req.body },
                { runValidators: true, new: true }               
            ); 
            
            if (!user) {
                return res.status(404).json({message:'No user found'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req,res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId});
            if (!user) {
                return res.status(404).json('No such user found!');
            }

            const thought = await Thought.findOneAndDelete(
                {users: req.params.userId},
                {$pull:{users:req.params.userId}},
                {new:true}
            )

            if (!thought) {
                return res.status(404).json({
                    message:'no thoughts for this user',});
            }

            res.json({message: 'User successfully deleted'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);

        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet:{ friends: req.body}},
                {runValidators: true, new:true}
            );

            if(!user) {
                return res
                .status(404)
                .json({ message: 'No user found with that ID '});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: {friendId: req.params.friendId}}},
                {runValidators: true, new:true}
            );

            if(!user) {
                return res
                .status(404)
                .json({ message: 'No user found with that ID '});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}