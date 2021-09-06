import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateQuestion = z.object({
  text: z.string(),
  choices: z.array(z.object({ text: z.string() })),
})

export default resolver.pipe(resolver.zod(CreateQuestion), resolver.authorize(), async (input) => {
  const question = await db.question.create({
    data: {
      ...input,
      choices: { create: input.choices },
    },
  })

  return question
})
