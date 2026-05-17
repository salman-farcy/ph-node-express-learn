import type { Request, Response } from "express"
import { userservice } from "./user.service"


const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userservice.createUserIntoDB(req.body)

    res.status(201).json({
      message: "Created",
      data: result.rows[0]
    })

  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userservice.getAllUsersFromDB()

    res.status(200).json({
      success: true,
      message: "Users Retrived Successfully",
      data: result.rows
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {

  try {
    const result = await userservice.getSingleUserFromDB(req.params)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Users Not found",
        data: {},
      })
    }

    res.status(200).json({
      success: true,
      message: "Users Retrived Successfully",
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
}

const singleUserUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const result = await userservice.singleUserUpateDB(req.body, id as string)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
        data: {}
      })
    }
    res.status(200).json({
      success: true,
      message: "Users Retrived Successfully",
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.massage,
      data: error
    })
  }
}

const deleteSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const result = await userservice.deleteSingleUserFromDB(id as string)

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: {}
      })
    }

    res.status(200).json({
      success: true,
      message: "Usere Delete Successfully",
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error
    })
  }
}

export const userController = {
     createUser,
     getAllUsers,
     getSingleUser,
     singleUserUpdate,
     deleteSingleUser
}