import {Router} from "express"
import { contactform } from "../controllers/contactform.controller.js"

const router=Router();

router.route("/contactusform").post(contactform)

export default router

