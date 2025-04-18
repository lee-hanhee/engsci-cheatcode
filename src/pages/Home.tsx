import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRoad, FaQuestion, FaBook, FaGraduationCap } from "react-icons/fa";

// Define semester structure type
type SemesterData = {
  id: string;
  title: string;
  courses: {
    code: string;
    path: string;
  }[];
};

// Define the list of majors (keep in sync with Majors.tsx)
const majors = [
  { id: "BME", slug: "bme", name: "Biomedical" },
  { id: "MI", slug: "mi", name: "Machine Intelligence" },
  { id: "ECE", slug: "ece", name: "Electrical & Computer" },
  { id: "AERO", slug: "aero", name: "Aerospace" },
  { id: "ROB", slug: "robo", name: "Robotics" },
  { id: "MSF", slug: "msf", name: "Mathematics, Statistics & Finance" },
  { id: "ES", slug: "energy", name: "Energy Systems" },
  { id: "EP", slug: "engphys", name: "Engineering Physics" },
];

const Home = () => {
  // Reference for semester section (for scroll functionality)
  const semesterSectionRef = useRef<HTMLDivElement>(null);
  const majorSectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contributeRef = useRef<HTMLDivElement>(null);

  // State for semester data
  const [semesters, setSemesters] = useState<SemesterData[]>([
    { id: "y1f", title: "Year 1 Fall", courses: [] },
    { id: "y1w", title: "Year 1 Winter", courses: [] },
    { id: "y2f", title: "Year 2 Fall", courses: [] },
    { id: "y2w", title: "Year 2 Winter", courses: [] },
  ]);

  // Fetch course codes for each semester
  useEffect(() => {
    const fetchSemesterData = async () => {
      const semesterTemplates = [
        { id: "y1f", title: "Year 1 Fall" },
        { id: "y1w", title: "Year 1 Winter" },
        { id: "y2f", title: "Year 2 Fall" },
        { id: "y2w", title: "Year 2 Winter" },
      ];

      const updatedSemesters = await Promise.all(
        semesterTemplates.map(async (semester) => {
          try {
            // Dynamically import the JSON data
            const data = await import(
              `../data/semesters/${semester.id.toUpperCase()}.json`
            );
            // Extract course codes and create path
            const courses = data.default.map((course: { code: string }) => ({
              code: course.code,
              path: `/${semester.id}/${course.code.toLowerCase()}`,
            }));
            return { ...semester, courses };
          } catch (error) {
            console.error(`Error loading ${semester.id} data:`, error);
            return { ...semester, courses: [] };
          }
        })
      );
      setSemesters(updatedSemesters);
    };

    fetchSemesterData();
  }, []);

  // Function to scroll to semester section
  const scrollToSemesters = () => {
    semesterSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to scroll to major section
  const scrollToMajors = () => {
    majorSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to scroll to features section
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to scroll to contribute section
  const scrollToContribute = () => {
    contributeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NΨ Roadmap</h1>
          <p className="text-xl md:text-2xl mb-6">
            The way to get the most out of your EngSci courses.
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Break down of U of T EngSci Year 1 & 2 courses into topic roadmaps,
            curated questions, cheatsheets, and process sheets.
          </p>

          {/* Navigation buttons in a grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button
              onClick={scrollToSemesters}
              className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-md shadow-md hover:bg-blue-50 transition-colors duration-300"
            >
              Explore by Semester
            </button>
            <button
              onClick={scrollToMajors}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 border border-white"
            >
              Explore by Major
            </button>
            <button
              onClick={scrollToFeatures}
              className="bg-transparent text-white font-semibold py-3 px-8 rounded-md border border-white hover:bg-blue-600 transition-colors duration-300"
            >
              What's Inside
            </button>
            <button
              onClick={scrollToContribute}
              className="bg-transparent text-white font-semibold py-3 px-8 rounded-md border border-white hover:bg-blue-600 transition-colors duration-300"
            >
              Contribute
            </button>
          </div>
        </div>
      </section>

      {/* Semester Navigation Section */}
      <section ref={semesterSectionRef} className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Choose Your Semester
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Find cheatsheets, process sheets, external resources, roadmaps, and
            practice questions for each course.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {semesters.map((semester) => (
              <div
                key={semester.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
              >
                <h3 className="text-2xl font-bold text-blue-700 mb-3">
                  {semester.title}
                </h3>
                <div className="text-sm text-gray-600 flex-grow">
                  {semester.courses.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {semester.courses.map((course) => (
                        <Link
                          key={course.code}
                          to={course.path}
                          className="inline-block px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                        >
                          {course.code}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p>Loading courses...</p>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    to={`/${semester.id}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View All Courses &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Navigation Section */}
      <section ref={majorSectionRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Choose Your Major
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Discover how Y1/Y2 course topics connect to your future major
            courses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {majors.map((major) => (
              <Link
                key={major.id}
                to={`/majors/${major.slug}`}
                className="bg-blue-50 hover:bg-blue-100 rounded-lg shadow-md p-6 transition-all hover:shadow-lg text-center"
              >
                <div className="font-bold text-xl text-blue-800 mb-2">
                  {major.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Overview Section */}
      <section ref={featuresRef} className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            What's Inside
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Explore the different features designed to help you succeed in your
            Engineering Science courses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center sm:items-start sm:flex-row">
              <div className="bg-blue-100 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                <FaRoad className="text-blue-700 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Topic Roadmaps
                </h3>
                <p className="text-gray-600">
                  Visual maps of each course's content flow to help you
                  understand how concepts connect.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center sm:items-start sm:flex-row">
              <div className="bg-blue-100 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                <FaQuestion className="text-blue-700 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Practice Questions
                </h3>
                <p className="text-gray-600">
                  Curated exam/midterm questions for each topic to test your
                  understanding and reinforce learning.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center sm:items-start sm:flex-row">
              <div className="bg-blue-100 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                <FaGraduationCap className="text-blue-700 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Major Navigation
                </h3>
                <p className="text-gray-600">
                  See how concepts from 1st/2nd year connect to 3rd year major
                  courses to help plan your academic journey.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center sm:items-start sm:flex-row">
              <div className="bg-blue-100 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                <FaBook className="text-blue-700 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Resources
                </h3>
                <p className="text-gray-600">
                  Access cheatsheets, process sheets, and external resources to
                  supplement your learning for each course.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section ref={contributeRef} className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Want to help improve this?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Join our community of contributors and help us make this resource
            even better for future EngSci students.
          </p>
          <div className="flex justify-center">
            <Link
              to="/contribute"
              className="bg-blue-700 text-white px-8 py-4 rounded-md font-medium hover:bg-blue-800 transition-colors text-lg"
            >
              Become a Contributor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
