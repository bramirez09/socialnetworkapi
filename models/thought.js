const { Schema, Types } = require('mongoose');

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

postSchema.virtual('reactionCount').get(function () {
    return this.reactions ? Object.keys(this.reactions).length : 0 
});

const Thought = model('thought',thoughtSchema);
module.exports=Thought;