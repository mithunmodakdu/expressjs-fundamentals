import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";
import type { IUser } from "./user.interface";

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await userService.updateUser(id as string, payload as Partial<IUser>)

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // console.log(req.params)

    const result = await userService.getUserById(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved by id",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

   const result = await userService.deleteUser(id as string);

    // console.log(result)
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  
  try {
    const result = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "All users retrieved successfully.",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

export const userController = {
  getUserById,
  deleteUser,
  getAllUsers,
  updateUser,
  createUser,
};
