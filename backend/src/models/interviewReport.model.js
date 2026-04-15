import mongoose, { Mongoose } from "mongoose";


const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical Question is Required"]
    },
    intention: {
        type: String,
        required: [true, "Technical Intention is Required"]
    },
    answer: {
        type: String,
        required: [true, "Tehnical Answer is Required"]
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral Question is Required"]
    },
    intention: {
        type: String,
        required: [true, "Behavioral Intention is Required"]
    },
    answer: {
        type: String,
        required: [true, "Behavioral Answer is Required"]
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is Required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is Required"]
    }
}, {
    _id: false
})


const preparationPlanSchema = new mongoose.Schema({
    day : {
        type: Number,
        required: [true, "Day is Required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is Required"]
    },
    tasks: [{
        type: String,
        required: [true, "Tasks are Required"]
    }]
})


const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job Description is Required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    title : {
        type: String,
        required: [true, "Title is required for the Report"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
});

const interviewReportModel = mongoose.model("interviewReports", interviewReportSchema);

export default interviewReportModel;