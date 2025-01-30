import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEnrollments } from "../store/enrollmentsSlice";
import { RootState } from "../types";
import { BookOpen } from "lucide-react";

const EnrolledCourses = () => {
  const dispatch = useDispatch();
  const enrollments = useSelector(
    (state: RootState) => state.enrollments.items
  );
  const courses = useSelector((state: RootState) => state.courses.items);
  const loading = useSelector((state: RootState) => state.enrollments.loading);

  useEffect(() => {
    dispatch(fetchEnrollments(1) as any);
  }, [dispatch]);

  const enrolledCourses = enrollments
    .map((enrollment) =>
      courses.find((course) => course.id === enrollment.courseId)
    )
    .filter(Boolean);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          هیچ دوره‌ای ثبت‌ نام نکرده‌اید
        </h2>
        <p className="mt-2 text-gray-600">
          دوره‌های ما را مشاهده کنید و امروز شروع به یادگیری کنید!
        </p>
        <Link
          to="/"
          className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          مشاهده دوره‌ها
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">دوره های من</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map(
          (course) =>
            course && (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      ثبت‌ نام شده
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {course.price.toLocaleString()} تومان
                    </span>
                  </div>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
