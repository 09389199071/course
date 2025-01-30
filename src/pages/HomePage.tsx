import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { fetchCourses, setFilter, setSearch } from "../store/coursesSlice";
import { RootState } from "../types";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    items: courses,
    loading,
    filter,
    search,
  } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses() as any);
  }, [dispatch]);

  const filteredCourses = courses.filter((course) => {
    const matchesFilter = !filter || course.category === filter;
    const matchesSearch =
      !search ||
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">دوره‌های موجود</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="دوره‌ها را جستجو کنید..."
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
          </div>

          <div className="relative">
            <select
              className="pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={filter}
              onChange={(e) => dispatch(setFilter(e.target.value))}
            >
              <option value="">همه دسته‌بندی‌ها</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {course.category}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {course.price.toLocaleString()} تومان
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
