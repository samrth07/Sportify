import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, BookOpen, Building, GraduationCap, Users, ExternalLink } from "lucide-react";

// Since we're converting from Next.js to React, we'll use standard HTML elements
// instead of Next.js components like Link and Image

function AboutPage() {
  const [counts, setCounts] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
    years: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => ({
        students: prev.students < 5000 ? prev.students + 50 : 5000,
        faculty: prev.faculty < 250 ? prev.faculty + 2 : 250,
        courses: prev.courses < 30 ? prev.courses + 1 : 30,
        years: prev.years < 15 ? prev.years + 1 : 15,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl">Zeal College</span>
          </div>
          <a
            href="https://zcoer.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700"
          >
            Visit Official Website
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    <Award className="mr-1 h-4 w-4" />
                    Autonomous Institute
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                    Zeal College of Engineering and Research
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    An autonomous institute of excellence in Pune, shaping the future of engineering education and
                    innovation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a href="https://zcoer.in/" target="_blank" rel="noopener noreferrer">
                    <button className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium">
                      Explore Zeal College
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </a>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center justify-center">
                <div className="relative h-[300px] w-full overflow-hidden rounded-2xl shadow-xl lg:h-[400px]">
                  <img
                    src="https://tse2.mm.bing.net/th?id=OIP.j_TOWl-YfqgpyGufhh_d_AAAAA&pid=Api&P=0&h=180"
                    alt="Zeal College Campus"
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center justify-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                <Building className="mr-1 h-4 w-4" />
                About Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Excellence in Engineering Education
              </h2>
              <p className="max-w-[85%] text-gray-500 md:text-xl/relaxed">
                Zeal College of Engineering and Research (ZCOER) is a premier autonomous educational institution located
                in Pune, Maharashtra. Established with a vision to provide quality technical education, ZCOER has
                emerged as a center of excellence in engineering education.
              </p>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center space-y-2 rounded-xl border border-green-100 bg-white p-6 shadow-sm"
              >
                <div className="rounded-full bg-green-100 p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {counts.students.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-500">Students</div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center space-y-2 rounded-xl border border-green-100 bg-white p-6 shadow-sm"
              >
                <div className="rounded-full bg-green-100 p-3">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{counts.faculty}</div>
                <div className="text-sm text-gray-500">Faculty Members</div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center space-y-2 rounded-xl border border-green-100 bg-white p-6 shadow-sm"
              >
                <div className="rounded-full bg-green-100 p-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{counts.courses}</div>
                <div className="text-sm text-gray-500">Courses Offered</div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center space-y-2 rounded-xl border border-green-100 bg-white p-6 shadow-sm"
              >
                <div className="rounded-full bg-green-100 p-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{counts.years}</div>
                <div className="text-sm text-gray-500">Years of Excellence</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center justify-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                <BookOpen className="mr-1 h-4 w-4" />
                Academic Excellence
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Why Choose Zeal College?
              </h2>
              <p className="max-w-[85%] text-gray-500 md:text-xl/relaxed">
                Discover the features that make Zeal College of Engineering and Research a leading institution in
                technical education.
              </p>
            </motion.div>
            <motion.div
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-xl border border-green-100 bg-white p-1 shadow-md"
              >
                <div className="flex h-[200px] flex-col justify-between rounded-lg p-6">
                  <div className="rounded-full bg-green-100 p-2 w-fit">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">Autonomous Status</h3>
                    <p className="text-sm text-gray-500">
                      As an autonomous institute, ZCOER has the freedom to design its curriculum, assessment methods,
                      and academic policies to meet industry demands.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-xl border border-green-100 bg-white p-1 shadow-md"
              >
                <div className="flex h-[200px] flex-col justify-between rounded-lg p-6">
                  <div className="rounded-full bg-green-100 p-2 w-fit">
                    <Building className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">Modern Infrastructure</h3>
                    <p className="text-sm text-gray-500">
                      State-of-the-art laboratories, well-equipped classrooms, extensive library resources, and
                      recreational facilities provide an ideal learning environment.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-xl border border-green-100 bg-white p-1 shadow-md"
              >
                <div className="flex h-[200px] flex-col justify-between rounded-lg p-6">
                  <div className="rounded-full bg-green-100 p-2 w-fit">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">Industry Connections</h3>
                    <p className="text-sm text-gray-500">
                      Strong ties with leading companies ensure internships, placements, and industry-relevant
                      curriculum for students.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-xl border border-green-100 bg-white p-1 shadow-md"
              >
                <div className="flex h-[200px] flex-col justify-between rounded-lg p-6">
                  <div className="rounded-full bg-green-100 p-2 w-fit">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">Research Opportunities</h3>
                    <p className="text-sm text-gray-500">
                      Students engage in cutting-edge research projects under the guidance of experienced faculty
                      members.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-xl border border-green-100 bg-white p-1 shadow-md"
              >
                <div className="flex h-[200px] flex-col justify-between rounded-lg p-6">
                  <div className="rounded-full bg-green-100 p-2 w-fit">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">Holistic Development</h3>
                    <p className="text-sm text-gray-500">
                      Beyond academics, ZCOER focuses on personality development, soft skills, and extracurricular
                      activities.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-xl border border-green-100 bg-white p-1 shadow-md"
              >
                <div className="flex h-[200px] flex-col justify-between rounded-lg p-6">
                  <div className="rounded-full bg-green-100 p-2 w-fit">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">Global Exposure</h3>
                    <p className="text-sm text-gray-500">
                      International collaborations, exchange programs, and global conferences provide students with
                      worldwide perspectives.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    <Award className="mr-1 h-4 w-4" />
                    Recognition
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                    Achievements & Accolades
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">
                    Zeal College has earned numerous recognitions for its commitment to quality education and
                    innovation.
                  </p>
                </div>
                <ul className="grid gap-3 text-gray-500">
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-1">
                      <div className="h-2 w-2 rounded-full bg-green-600" />
                    </div>
                    <span>Autonomous status granted by UGC</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-1">
                      <div className="h-2 w-2 rounded-full bg-green-600" />
                    </div>
                    <span>NAAC accreditation with high grade</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-1">
                      <div className="h-2 w-2 rounded-full bg-green-600" />
                    </div>
                    <span>NBA accreditation for engineering programs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-1">
                      <div className="h-2 w-2 rounded-full bg-green-600" />
                    </div>
                    <span>Recognized for research contributions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-1">
                      <div className="h-2 w-2 rounded-full bg-green-600" />
                    </div>
                    <span>Excellence in placement records</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center justify-center">
                <div className="w-full overflow-hidden rounded-xl border border-green-100 shadow-lg">
                  <div className="relative h-[200px] w-full">
                    <img
                      src="https://via.placeholder.com/500x200"
                      alt="Zeal College Campus"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="grid gap-4 p-6">
                    <h3 className="text-xl font-bold text-gray-900">Student Success Stories</h3>
                    <div className="grid gap-4">
                      <div className="flex items-start gap-4 rounded-lg border border-green-100 p-3">
                        <div className="rounded-full bg-green-100 p-1">
                          <GraduationCap className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none text-gray-900">
                            Placed at Top MNCs
                          </p>
                          <p className="text-sm text-gray-500">
                            Our students have secured positions at leading companies like Google, Microsoft, Amazon, and
                            more.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 rounded-lg border border-green-100 p-3">
                        <div className="rounded-full bg-green-100 p-1">
                          <Users className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none text-gray-900">
                            Entrepreneurial Ventures
                          </p>
                          <p className="text-sm text-gray-500">
                            Many alumni have founded successful startups and innovative businesses.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-green-50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  Ready to Join Zeal College?
                </h2>
                <p className="max-w-[85%] mx-auto text-gray-500 md:text-xl/relaxed">
                  Take the first step towards a bright future in engineering and technology.
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full shadow-lg">
                <a href="https://zcoer.in/" target="_blank" rel="noopener noreferrer">
                  <button className="rounded-full bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg h-auto">
                    Visit Official Website
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-green-100 bg-white py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-gray-900">
              © {new Date().getFullYear()} Zeal College of Engineering and Research
            </p>
          </div>
          <a
            href="https://zcoer.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-600 hover:text-green-700"
          >
            Visit Official Website
          </a>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;