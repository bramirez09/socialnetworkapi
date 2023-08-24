const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Please add a text'],
            minlength: [1, "Too short"],
            maxlength: [280, "too long"]
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: [
            {
                type: Types.ObjectId, ref: 'User',
            }
        ],
        reactions: [reactionSchema]
    },
    {
        toJSON: { virtuals: true },
        id: false,
    }
);

reactionSchema.virtual('reactionCount').get(function () {
    return this.reactions ? Object.keys(this.reactions).length : 0 
});

const Thought = model('Thought',thoughtSchema);
module.exports=Thought;