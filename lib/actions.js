"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export async function insertPage({name, adUnit}) {
  await prisma.Page.create({
    data: {
      name,
      adUnit
    },
  });

  // revalidatePath("/");
}

// export async function deleteTodo(id) {
//   await prisma.todo.delete({ where: { id } });
//
//   revalidatePath("/");
// }
//
// export async function setChecked(id: number, checked: boolean) {
//   await prisma.todo.update({ data: { checked }, where: { id } });
//
//   revalidatePath("/");
// }
