import { prisma } from '@/lib/prisma';

const CreateSlot = async () => {
  const slots = await prisma.adSlot.findMany();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Home</h2>

      <ul className="flex flex-col gap-y-2">
        {slots.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default CreateSlot;