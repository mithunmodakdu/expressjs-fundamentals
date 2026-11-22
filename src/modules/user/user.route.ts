import { Router, type NextFunction, type Request, type Response} from "express";
import { userController } from './user.controller';
import checkAuth from "../../middlewares/checkAuth";


const router = Router();


router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.get("/", checkAuth, userController.getAllUsers);
router.put("/:id", userController.updateUser);
router.post("/", userController.createUser);

export const userRoute = router;