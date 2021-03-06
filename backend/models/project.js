const Joi = require('joi');
const mongoose = require('mongoose'); 

const Project = mongoose.model('Project', new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 50
	},
	description: { type: String },
	iterations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Iteration' }],
	date: { type: Date, default: Date.now }
}));

function validateProject(project) {
	const schema = { title: Joi.string().min(3).required(), description: Joi.string().allow(''), iterations: Joi.array().allow([]) };
	return Joi.validate(project, schema);
}

module.exports.Project = Project;
module. exports.validate = validateProject;