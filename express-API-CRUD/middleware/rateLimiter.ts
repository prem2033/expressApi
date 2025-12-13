import { rateLimit } from 'express-rate-limit'

export const apiRateLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: { error: "Too Many Request.Please try later" },
    standardHeaders: true,
    legacyHeaders: false
})
