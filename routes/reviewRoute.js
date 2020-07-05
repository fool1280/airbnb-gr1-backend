const router = require("express").Router({ mergeParams: true });
const { loginRequired } = require("../middleware/auth");

const {
    createReview,
    getAllReview,
    deleteReview,
    updateReview,
} = require("../controllers/reviewController");

router
    .route("/")
    .post(createReview)
    .get(getAllReview)
    .delete(deleteReview)
    .patch(updateReview);

module.exports = router;
