'use server';
import { NextResponse } from 'next/server';
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

type ValueCount = {
  topic: string;
  count: number;
};

export async function countTopic() {
  try {
    const valueCounts: ValueCount[] = await prisma.$queryRaw`
      SELECT "topic", COUNT(*)
      FROM "Post"
      GROUP BY "topic"
    `;
    return valueCounts.map((item: ValueCount) => ({
      topic: item.topic,
      count: Number(item.count), // Convert BigInt to number
    }));
    return valueCounts;
  } catch (error) {
    console.error('Error fetching value counts:', error);
    throw new Error('Failed to fetch value counts');
  } finally {
    await prisma.$disconnect();
  }
}

type ValueCountC = {
  category: string;
  count: number;
};

export async function countCategory() {
  try {
    const valueCountsC: ValueCountC[] = await prisma.$queryRaw`
      SELECT "category", COUNT(*)
      FROM "Post"
      GROUP BY "category"
    `;
    return valueCountsC.map((item2: ValueCountC) => ({
      category: item2.category,
      count: Number(item2.count), // Convert BigInt to number
    }));
    return valueCountsC;
  } catch (error) {
    console.error('Error fetching value counts:', error);
    throw new Error('Failed to fetch value counts');
  } finally {
    await prisma.$disconnect();
  }
}