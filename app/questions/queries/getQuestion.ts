import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetQuestion = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetQuestion), resolver.authorize(), async ({ id }) => {
  const question = await db.question.findFirst({ where: { id }, include: { choices: true } })

  if (!question) throw new NotFoundError()

  return question
})
