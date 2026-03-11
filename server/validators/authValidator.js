import { z } from "zod";

const nameRegex = /^[A-Za-z. -]+(\s*[A-Za-z. -]+)*$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  role: z.string().optional(),
}).superRefine((data, ctx) => {
  const isRegister = data.name !== undefined || data.confirmPassword !== undefined;

  if (isRegister) {
    // Register validation
    if (!data.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name is required",
        path: ["name"],
      });
    } else {
      if (data.name.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name must be at least 3 characters",
          path: ["name"],
        });
      }
      if (data.name.length > 30) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name too long",
          path: ["name"],
        });
      }
      if (!nameRegex.test(data.name)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name must contain only letters",
          path: ["name"],
        });
      }
    }

    if (!data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is required",
        path: ["email"],
      });
    } else {
      if (!emailRegex.test(data.email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email address",
          path: ["email"],
        });
      }
      if (data.email.length > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email too long",
          path: ["email"],
        });
      }
    }

    if (!data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
        path: ["password"],
      });
    } else {
      if (!passwordRegex.test(data.password)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must include uppercase, lowercase, number and special character",
          path: ["password"],
        });
      }
    }

    if (!data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm password is required",
        path: ["confirmPassword"],
      });
    }

    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  } else {
    // Login validation
    if (!data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is required",
        path: ["email"],
      });
    } else {
      if (!emailRegex.test(data.email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email address",
          path: ["email"],
        });
      }
    }

    if (!data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
        path: ["password"],
      });
    }
  }
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name too long")
    .regex(nameRegex, "Name must contain only letters")
    .optional(),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must include uppercase, lowercase, number and special character"
    )
    .optional(),
});
