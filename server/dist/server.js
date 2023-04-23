"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const envalid_1 = __importDefault(require("./utils/envalid"));
const workoutRoutes_1 = __importDefault(require("./routes/workoutRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/workouts/', workoutRoutes_1.default);
app.get('/', (req, res) => {
    res.json({ msg: 'hello, world!' });
});
mongoose_1.default
    .connect(envalid_1.default.MONGO_URI)
    .then(() => {
    app.listen(envalid_1.default.PORT, () => {
        console.log(`app listening on port ${process.env.PORT}`);
    });
})
    .catch(err => console.log(err));
//# sourceMappingURL=server.js.map