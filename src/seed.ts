import { connectDB, getDB } from './config/db';
import dotenv from 'dotenv';

dotenv.config();

interface Course {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  createdAt: Date;
}

const sampleCourses: Course[] = [
  {
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, JavaScript and build modern responsive websites from scratch.",
    price: 49,
    thumbnail: "https://i.ibb.co.com/4g2J942/web-dev.png",
    createdAt: new Date()
  },
  {
    title: "React for Beginners",
    description: "Master React.js essentials including components, props, state, and hooks.",
    price: 59,
    thumbnail: "https://i.ibb.co.com/9v18g2t/react.png",
    createdAt: new Date()
  },
  {
    title: "Data Science Basics",
    description: "An introductory guide to data analysis, Python, and statistical thinking.",
    price: 49,
    thumbnail: "https://i.ibb.co.com/8K9L7x2/data-science.png",
    createdAt: new Date()
  },
  {
    title: "UI/UX Design Basics",
    description: "Learn wireframing, prototyping, and user-centered design principles using Figma.",
    price: 39,
    thumbnail: "https://i.ibb.co.com/2m65s7q/ui-ux.png",
    createdAt: new Date()
  }
];

async function seedDatabase(): Promise<void> {
  try {
    await connectDB();
    const db = getDB();


    await db.collection('courses').deleteMany({});
    const result = await db.collection('courses').insertMany(sampleCourses);

    console.log(`✅ Successfully seeded ${result.insertedCount} courses into the database!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
