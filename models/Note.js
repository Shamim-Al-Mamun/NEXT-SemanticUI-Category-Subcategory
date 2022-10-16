const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    description: {
        type: String,
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    parentId:{
        type: String,
        default:null
    },
    label:{
        type: String,
        required: true,
    },
    formID:{
        type:Number,
        default:1
    },
    id:{
        type: String,
    }
})

module.exports = mongoose.models.Cat2 || mongoose.model('Cat2', NoteSchema);