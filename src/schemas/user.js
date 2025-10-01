import { z } from "zod";

 export const createUserSchema = z.object({
      first_name: z.string({
        message: 'First name is required.',
      }).trim().min(3, {
        message: 'First name must have at least 3 characters.'
      }),
      last_name: z.string({
        required_error: 'Last name is required.'
      }).trim().min(3, {
        message: 'Last name must have at least 3 characters.'
      }),
      email: z.email({
        message: 'Invalid email.'
      }).trim().min(3, {
        message: 'Email must have at least 3 characters.'
      }),
      password: z.string({
        required_error: 'Password is required.'
      }).trim().min(6, {
        message: 'Password must have at least 6 characters.'
      })
     })

     export const updateUserSchema = createUserSchema.partial().strict({
      message: 'Some field is not allowed.'
     })