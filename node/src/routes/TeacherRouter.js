const teacherRouter = require('express').Router()
const TeacherService = require('../services/TeacherService')
const SubjectService = require('../services/SubjectService')

teacherRouter.post('/create', async (request, response) => {
    try {
        await TeacherService.createTeacher(request.body)
        response.status(200).json({ success: true })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

teacherRouter.post('/addSubject', async (request, response) => {
    try {
        await TeacherService.addSubjectToTeacher(request.body.email, request.body.subjectCode)
        response.status(200).json({ success: true })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

teacherRouter.get('/byEmail/:email', async (request, response) => {
    try {
        let teacher = await TeacherService.findTeacherByEmail(request.params.email)
        response.status(200).json({ success: true, teacher: teacher })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

teacherRouter.get('/getSubjectsForTeacher/:email', async (request, response) => {
    try {
        let teacher = await TeacherService.findTeacherByEmail(request.params.email)
        let subjectList = await SubjectService.findSubjects(teacher.teachingSubjects)
        response.status(200).json({ success: true, subjectList: subjectList })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

module.exports = teacherRouter