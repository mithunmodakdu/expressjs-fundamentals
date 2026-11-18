import { Router} from "express";
import { userController } from './user.controller';

const router = Router();

router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.updateUser);
router.post("/", userController.createUser);

export const userRoute = router;