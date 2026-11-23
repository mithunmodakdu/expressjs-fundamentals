import { Router, type NextFunction, type Request, type Response} from "express";
import { userController } from './user.controller';
import checkAuth from "../../middlewares/checkAuth";
import { USER_ROLE } from "./user.interface";


const router = Router();

router.get("/:id", checkAuth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user ), userController.getUserById);
router.get("/", checkAuth(USER_ROLE.super_admin, USER_ROLE.admin), userController.getAllUsers);
router.put("/:id", userController.updateUser);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);

export const userRoute = router;