import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createEnrollment } from "../store/enrollmentsSlice";
import { RootState } from "../types";
import { Book, Clock } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const course = useSelector((state: RootState) =>
    state.courses.items.find((c) => c.id === Number(id))
  );

  const isEnrolled = useSelector((state: RootState) =>
    state.enrollments.items.some((e) => e.courseId === Number(id))
  );

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">دوره پیدا نشد</h2>
      </div>
    );
  }

  const handleEnroll = () => {
    dispatch(createEnrollment({ userId: 1, courseId: course.id }) as any);
    navigate("/enrolled");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>

          {/* نمایش عکس دوره */}
          <div className="mb-6">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {course.category}
            </span>
            <div className="flex items-center text-gray-600 px-2">
              <span className="font-bold">
                {course.price.toLocaleString()} تومان
              </span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-600">{course.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Book className="h-6 w-6 text-indigo-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">منابع دوره</h3>
                <p className="text-sm text-gray-500">منابع یادگیری جامع</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 text-indigo-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">
                  یادگیری به صورت خودآموز
                </h3>
                <p className="text-sm text-gray-500">
                  با سرعت خودتان یاد بگیرید
                </p>
              </div>
            </div>
          </div>

          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              ثبت نام در دوره
            </button>
          ) : (
            <div className="text-center p-4 bg-green-50 rounded-md">
              <p className="text-green-800 font-medium">
                شما قبلاً در این دوره ثبت نام کرده‌اید!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
