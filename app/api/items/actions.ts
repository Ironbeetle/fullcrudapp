'use server';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { itemSchema } from '@/lib/validation';

export async function getItems() {
  try{
    return prisma.post.findMany({ orderBy: { id: 'desc' } });
  }catch(e){
    console.log(e);
  }finally{
    await prisma.$disconnect();
  }
}

export async function createItem(data: FormData) {
  const parsed = itemSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) {
    throw new Error('Validation Error');
  }
  const { title, subtitle, language, category, demographic, topic, context, comment, vidurl, thumbnail, thumbimg, nation } = parsed.data;

  try {
    const result = await prisma.post.create({
      data: {
        title,
        subtitle,
        language,
        category,
        demographic,
        topic,
        context,
        comment,
        vidurl,
        thumbnail,
        thumbimg,
        nation,
      },
    });
    return result;
  } catch (e) {
    console.error('Error creating item:', e);
    throw new Error('Failed to create item');
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateItem(id: string, data: FormData) {
  const parsed = itemSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) {
    throw new Error('Validation Error');
  }
  const { title, subtitle, language, category, demographic, topic, context, comment, vidurl, thumbnail, thumbimg, nation } = parsed.data;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    throw new Error('Post not found');
  }
  return prisma.post.update({ where: { id }, data: { title, subtitle, language, category, demographic, topic, context, comment, vidurl, thumbnail, thumbimg, nation  } });
}

export async function deleteItem(id: string): Promise<void> {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    throw new Error('Post not found');
  }
  await prisma.post.delete({ where: { id } });
}

export async function searchPosts(query: string) {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { category: { contains: query } },
        { topic: { contains: query } },
      ],
    },
  });
  return posts;
}