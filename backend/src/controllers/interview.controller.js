import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import {generateInterviewReport, generateResumePdf} from '../services/ai.service.js';
import interviewReportModel from '../models/interviewReport.model.js';

/**
 * @name generateInterviewReportController
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description Generate Interview Report on the basis of Resume, Job Description and Self Description
 * @access private
 */
const generateInterviewReportController = async (req, res) => {
    const resumeFile = req.file;
    
    const resumeContent = await pdfParse(resumeFile.buffer);

    const {selfDescription , jobDescription} = req.body;

    try{
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text, 
            selfDescription, 
            jobDescription
        });

        console.log()
    
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        });


        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        });

    }
    catch(err) {
        return res.status(500).json({
            message: "Response Generation from Gemini AI failed",
            error: err
        })
    }
};




/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

export { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }