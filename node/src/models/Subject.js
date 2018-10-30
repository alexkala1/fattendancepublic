const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Lesson = require('./Lesson')

const subjectSchema = new Schema({
    name: { index: true, unique: true, required: true, type: String },
    kwdikosMathimatos: { index: true, unique: true, required: true, type: String },
    synoloMathimaton: { required: true, type: Number },
    lessonList: { required: true, type: [Lesson.schema] }
})

module.exports = mongoose.model('Subject', subjectSchema)