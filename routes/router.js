import express from "express";

import GamesController from "../controllers/games.js";
import GameVotesController from "../controllers/gamesVotes.js";
import AccountsController from "../controllers/accounts.js";
import UploadsController from "../controllers/uploads.js"; 
import JudgesController from "../controllers/judges.js"; 

import {
  validateGameCreate,
  validateGameIdExists
} from "../middleware/games.js";

import {
  validateVoteCreate,
  validateGameandJudgeIdExists,
  checkPreviousJudgeVoteExists,
} from "../middleware/votes.js";

import {
  validateAccountCreate,
  validateEmailIsNotRegistered,
  validateEmailIsRegistered,
  validateAccountLogin,
  validateForgotPassword,
  validateResetPassword
} from "../middleware/accounts.js";

import { verifySession } from "../middleware/accounts.js";
import { uploadImage, processImage } from "../middleware/uploads.js"; // 

const route = express.Router();

route
  .route("/games")
  .get(GamesController.getAllGames)
  .post([verifySession, validateGameCreate], GamesController.addGame);

route
  .route("/games/votes")
  .get(GameVotesController.getAllVotes)

route
  .route("/games/:idGame")
  .get([],GamesController.getGameById)
  .patch([verifySession, validateGameIdExists], GamesController.editGame)
  .delete([verifySession, validateGameIdExists], GamesController.deleteGame);

route
  .route("/games/:idGame/average")
  .get(GamesController.getGameByIdAndAverageVotes);

route.route("/games/edition/:edition").get(GamesController.getGamesByEdition);

route
  .route("/games/:idGame/votes")
  .get([], GameVotesController.getVotesByGame)
  .post(
    [
      verifySession,
      validateVoteCreate,
      validateGameandJudgeIdExists,
      checkPreviousJudgeVoteExists,
    ],
    GameVotesController.addVote
  );
route
  .route("/judges")
  .get(JudgesController.getAllJudges)

route.route("/judges/:idJudge/votes").get(GameVotesController.getVotesByJudge);
route.route("/judges/:idJudge").get(JudgesController.getJudgeById);

// Register
route
  .route("/auth/account")
  .post(
    [validateAccountCreate, validateEmailIsNotRegistered],
    AccountsController.createAccount
  );

// Login
route
  .route("/auth/session")
  .post(
    [validateAccountLogin, validateEmailIsRegistered],
    AccountsController.login
  )
  .delete([verifySession], AccountsController.logout);

  // Password Reset
  route
  .route("/auth/password/forgot")
  .post([validateForgotPassword], AccountsController.forgotPassword);

  route
    .route("/auth/password/reset")
    .post([validateResetPassword], AccountsController.resetPassword);

  // Uploads
route
  .route("/uploads")
  .post([verifySession, uploadImage, processImage], UploadsController.uploadFile);

export default route;
