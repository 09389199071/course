export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
}

export interface RootState {
  courses: {
    items: Course[];
    loading: boolean;
    error: string | null;
    filter: string;
    search: string;
  };
  enrollments: {
    items: Enrollment[];
    loading: boolean;
    error: string | null;
  };
}
