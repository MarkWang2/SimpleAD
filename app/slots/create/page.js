import { prisma } from '@/lib/prisma'

const CreateSlot = async () => {
  const slots = await prisma.adSlot.findMany()

  const create = async (name) => {
    const result = await prisma.user.create({
      data: {
        name: name,
        posts: {
          create: [
            { title: 'How to make an omelette' },
            { title: 'How to eat an omelette' },
          ],
        },
      },
      include: {
        posts: true, // Include all posts in the returned object
      },
    })
  }
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Home</h2>

      <ul className="flex flex-col gap-y-2">

      </ul>
    </div>
  )
}
export default CreateSlot