"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const workoutController_1 = require("../controllers/workoutController");
router.get('/', workoutController_1.getAllWorkouts);
router.get('/:id', workoutController_1.getSingleWorkout);
router.post('/', workoutController_1.createWorkout);
router.patch('/:id', workoutController_1.updateWorkout);
router.delete('/:id', workoutController_1.deleteWorkout);
exports.default = router;
//# sourceMappingURL=workoutRoutes.js.map