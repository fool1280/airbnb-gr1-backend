const router = require("express").Router({ mergeParams: true });
const hostModifyRouter = require("./hostModifyRoute");
const reviewRouter = require("./reviewRoute");
const { loginRequired, hostRequired } = require("../middleware/auth");

const {
    createReview,
    getAllReview,
    deleteReview,
} = require("../controllers/reviewController");

const {
    getExperiences,
    createExperience,
} = require("../controllers/expController");

router.use("/host", loginRequired, hostRequired, hostModifyRouter);
router.use("/:id/reviews", loginRequired, reviewRouter);

router
    .route("/")
    .get(getExperiences)
    .post(loginRequired, hostRequired, createExperience);

router
    .route("/:id/reviews")
    .post(loginRequired, createReview)
    .get(loginRequired, getAllReview)
    .delete(loginRequired, deleteReview);

module.exports = router;
