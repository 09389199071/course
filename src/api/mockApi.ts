import { Course, Enrollment } from "../types";

const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: "مقدمه‌ای بر React",
    description: "مبانی React را بیاموزید",
    price: 99.99,
    category: "برنامه‌نویسی",
    image: "/images/intro.jpg",
  },
  {
    id: 2,
    title: "React پیشرفته",
    description: "مفاهیم پیشرفته React را بیاموزید",
    price: 199.99,
    category: "برنامه‌نویسی",
    image: "/images/intro.jpg",
  },
  {
    id: 3,
    title: "مقدمه‌ای بر طراحی",
    description: "مبانی طراحی را بیاموزید",
    price: 79.99,
    category: "طراحی",
    image: "/images/intro.jpg",
  },
  {
    id: 4,
    title: "مبانی HTML و CSS",
    description: "مبانی HTML و CSS را برای طراحی وب بیاموزید",
    price: 49.99,
    category: "برنامه‌نویسی",
    image: "/images/intro.jpg",
  },
  {
    id: 5,
    title: "Python برای مبتدیان",
    description: "آشنایی با زبان برنامه‌نویسی Python برای شروع کدنویسی",
    price: 89.99,
    category: "برنامه‌نویسی",
    image: "/images/intro.jpg",
  },
  {
    id: 6,
    title: "توسعه وب با Node.js",
    description:
      "یاد بگیرید چگونه با استفاده از Node.js اپلیکیشن‌های وب بسازید",
    price: 149.99,
    category: "برنامه‌نویسی",
    image: "/images/intro.jpg",
  },
  {
    id: 7,
    title: "دیزاین رابط کاربری",
    description: "مبانی طراحی رابط کاربری و تجربه کاربری (UI/UX) را بیاموزید",
    price: 109.99,
    category: "طراحی",
    image: "/images/intro.jpg",
  },
  {
    id: 8,
    title: "مبانی عکاسی دیجیتال",
    description: "آشنایی با اصول اولیه عکاسی دیجیتال و تکنیک‌های آن",
    price: 59000,
    category: "عکاسی",
    image: "/images/intro.jpg",
  },
];

const MOCK_ENROLLMENTS: Enrollment[] = [];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  getCourses: async () => {
    await delay(500);
    return MOCK_COURSES;
  },

  getCourseById: async (id: number) => {
    await delay(500);
    const course = MOCK_COURSES.find((c) => c.id === id);
    if (!course) throw new Error("Course not found");
    return course;
  },

  createEnrollment: async (userId: number, courseId: number) => {
    await delay(500);
    const enrollment: Enrollment = {
      id: MOCK_ENROLLMENTS.length + 1,
      userId,
      courseId,
    };
    MOCK_ENROLLMENTS.push(enrollment);
    return enrollment;
  },

  getEnrollments: async (userId: number) => {
    await delay(500);
    return MOCK_ENROLLMENTS.filter((e) => e.userId === userId);
  },
};
