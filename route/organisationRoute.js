const express = require('express');
const router = express.Router();


const  { createOrganisation, getAllOrganisations, getOrganisation, addUserToOrganisation  } = require("../controller/organisationController");
// const { isAuthenticated } = require('../middlewares/auth');  // Assuming you have authentication middleware

// Routes
router.get('/', getAllOrganisations);
router.get('/:orgId', getOrganisation);
router.post('/', createOrganisation);
router.post('/:orgId/users', addUserToOrganisation);

module.exports = router;
