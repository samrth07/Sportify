"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Custom Arrow Icon Component
const ArrowUpRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
)

export default function Article() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredNews, setFilteredNews] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredArticle, setHoveredArticle] = useState(null)

  // Exercise news data - with ACTUAL article URLs
  const exerciseNews = [
    {
      id: 1,
      title: "The Science Behind High-Intensity Interval Training",
      category: "cardio",
      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "April 8, 2025",
      excerpt:
        "New research reveals why HIIT workouts produce remarkable results in less time than traditional cardio exercises.",
      readTime: "5 min read",
      link: "https://www.healthline.com/health/fitness-exercise/high-intensity-interval-training-hiit",
    },
    {
      id: 2,
      title: "Strength Training Fundamentals for Beginners",
      category: "strength",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "April 5, 2025",
      excerpt:
        "Learn the essential principles of strength training to build muscle effectively and safely as a beginner.",
      readTime: "7 min read",
      link: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/strength-training/art-20046670",
    },
    {
      id: 3,
      title: "Yoga for Athletic Recovery: A Comprehensive Guide",
      category: "flexibility",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1220&q=80",
      date: "April 2, 2025",
      excerpt:
        "Discover how incorporating yoga into your routine can enhance recovery and improve overall athletic performance.",
      readTime: "6 min read",
      link: "https://www.yogajournal.com/practice/yoga-for-athletes/",
    },
    {
      id: 4,
      title: "Nutrition Timing: When to Eat for Maximum Exercise Results",
      category: "nutrition",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80",
      date: "March 30, 2025",
      excerpt:
        "The latest research on optimal meal timing around workouts to maximize energy, performance, and recovery.",
      readTime: "8 min read",
      link: "https://www.precisionnutrition.com/nutrient-timing",
    },
    {
      id: 5,
      title: "The Mental Benefits of Regular Exercise",
      category: "wellness",
      image:
        "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      date: "March 27, 2025",
      excerpt: "How consistent physical activity impacts brain health, mood regulation, and cognitive function.",
      readTime: "5 min read",
      link: "https://www.apa.org/topics/exercise-fitness/stress",
    },
    {
      id: 6,
      title: "Functional Training: Exercises That Improve Daily Life",
      category: "strength",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "March 24, 2025",
      excerpt:
        "Why functional fitness training matters and how it translates to better performance in everyday activities.",
      readTime: "6 min read",
      link: "https://www.acefitness.org/education-and-resources/professional/expert-articles/5811/what-is-functional-training/",
    },
    {
      id: 7,
      title: "The Ultimate Guide to Running Form and Technique",
      category: "cardio",
      image:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "March 21, 2025",
      excerpt:
        "Improve your running efficiency, prevent injuries, and enhance performance with proper form techniques.",
      readTime: "7 min read",
      link: "https://www.runnersworld.com/training/a20790268/proper-running-form/",
    },
    {
      id: 8,
      title: "Overcoming Workout Plateaus: Strategies That Work",
      category: "wellness",
      image:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      date: "March 18, 2025",
      excerpt:
        "Effective methods to break through fitness plateaus and continue making progress in your exercise journey.",
      readTime: "6 min read",
      link: "https://www.shape.com/fitness/tips/how-break-through-workout-plateau",
    },
    {
      id: 9,
      title: "Mobility vs. Flexibility: Understanding the Difference",
      category: "flexibility",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "March 15, 2025",
      excerpt:
        "Clarifying the important distinctions between mobility and flexibility and why both matter for fitness.",
      readTime: "5 min read",
      link: "https://www.self.com/story/whats-the-difference-between-mobility-and-flexibility",
    },
    {
      id: 10,
      title: "Hydration Strategies for Optimal Exercise Performance",
      category: "nutrition",
      image:
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "March 12, 2025",
      excerpt:
        "The science of proper hydration before, during, and after workouts to maximize performance and recovery.",
      readTime: "6 min read",
      link: "https://www.gssiweb.org/sports-science-exchange/article/sse-174-hydration-and-aerobic-performance-impact-of-environment",
    },
    {
      id: 11,
      title: "The Power of Compound Exercises for Total Body Strength",
      category: "strength",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "March 9, 2025",
      excerpt:
        "Why exercises like squats, deadlifts, and bench presses should be the foundation of your strength routine.",
      readTime: "7 min read",
      link: "https://www.verywellfit.com/compound-exercises-1230976",
    },
    {
      id: 12,
      title: "Mindful Running: Combining Meditation with Movement",
      category: "cardio",
      image:
        "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "March 6, 2025",
      excerpt:
        "How practicing mindfulness during your runs can enhance performance and create a deeper mind-body connection.",
      readTime: "5 min read",
      link: "https://www.headspace.com/articles/mindful-running",
    },
    {
      id: 13,
      title: "Anti-Inflammatory Foods for Faster Exercise Recovery",
      category: "nutrition",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "March 3, 2025",
      excerpt:
        "The best foods to include in your diet to reduce inflammation, speed recovery, and optimize performance.",
      readTime: "6 min read",
      link: "https://www.healthline.com/nutrition/13-anti-inflammatory-foods",
    },
    {
      id: 14,
      title: "Pilates for Core Strength: Beyond the Basics",
      category: "flexibility",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "February 28, 2025",
      excerpt:
        "Advanced Pilates techniques to strengthen your core, improve posture, and enhance overall body control.",
      readTime: "7 min read",
      link: "https://www.pilates.com/BBAPP/V/pilates/library/articles/pilates-for-core-strength.html",
    },
    {
      id: 15,
      title: "Sleep and Exercise: The Critical Connection",
      category: "wellness",
      image:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      date: "February 25, 2025",
      excerpt:
        "How quality sleep impacts exercise performance and why athletes should prioritize sleep as part of training.",
      readTime: "8 min read",
      link: "https://www.sleepfoundation.org/physical-activity/athletic-performance-and-sleep",
    },
    {
      id: 16,
      title: "Plyometric Training for Explosive Power",
      category: "strength",
      image:
        "https://images.unsplash.com/photo-1434596922112-19c563067271?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "February 22, 2025",
      excerpt:
        "How to incorporate jumping, bounding, and explosive movements to develop power and athletic performance.",
      readTime: "6 min read",
      link: "https://www.acefitness.org/education-and-resources/professional/expert-articles/5811/plyometrics-controlled-impact-maximum-power/",
    },
    {
      id: 17,
      title: "The Athlete's Guide to Intermittent Fasting",
      category: "nutrition",
      image:
        "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "February 19, 2025",
      excerpt:
        "How to implement intermittent fasting protocols while maintaining optimal athletic performance and recovery.",
      readTime: "9 min read",
      link: "https://www.precisionnutrition.com/intermittent-fasting-for-athletes",
    },
    {
      id: 18,
      title: "Heart Rate Training Zones Explained",
      category: "cardio",
      image:
        "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1162&q=80",
      date: "February 16, 2025",
      excerpt: "Understanding the five heart rate zones and how to use them to optimize your cardiovascular training.",
      readTime: "7 min read",
      link: "https://www.polar.com/blog/running-heart-rate-zones-basics/",
    },
    {
      id: 19,
      title: "Dynamic Stretching: The Ultimate Pre-Workout Routine",
      category: "flexibility",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "February 13, 2025",
      excerpt: "A comprehensive guide to dynamic stretching techniques that prepare your body for optimal performance.",
      readTime: "5 min read",
      link: "https://www.self.com/gallery/essential-stretches-slideshow",
    },
    {
      id: 20,
      title: "Exercise and Immunity: Boosting Your Body's Defenses",
      category: "wellness",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      date: "February 10, 2025",
      excerpt:
        "How regular exercise strengthens your immune system and the right amount of activity for immune benefits.",
      readTime: "6 min read",
      link: "https://medlineplus.gov/ency/article/007165.htm",
    },
  ]

  // Handle article click - DIRECT NAVIGATION to actual articles
  const handleArticleClick = (link) => {
    window.open(link, "_blank")
  }

  // Filter news based on category and search query
  useEffect(() => {
    let result = [...exerciseNews]

    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item) => item.title.toLowerCase().includes(query) || item.excerpt.toLowerCase().includes(query),
      )
    }

    setFilteredNews(result)
  }, [activeCategory, searchQuery])

  // Categories for filter
  const categories = [
    { id: "all", label: "All Articles" },
    { id: "cardio", label: "Cardio" },
    { id: "strength", label: "Strength" },
    { id: "flexibility", label: "Flexibility" },
    { id: "nutrition", label: "Nutrition" },
    { id: "wellness", label: "Wellness" },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-800 to-green-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern bg-green-900/90 bg-opacity-80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 mb-4 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30"
            >
              <span className="text-green-100 font-medium">Latest Updates</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Exercise & Fitness News
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-green-100 mb-8"
            >
              Stay updated with the latest research, trends, and advice in the world of fitness and exercise
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 text-white"
            fill="currentColor"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-green-500 text-white shadow-md transform -translate-y-0.5"
                    : "bg-gray-100 text-green-700 hover:bg-green-100"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredNews.length > 0 ? (
              filteredNews.map((article) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredArticle(article.id)}
                  onHoverEnd={() => setHoveredArticle(null)}
                  className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full transform transition-all hover:shadow-xl"
                  onClick={() => handleArticleClick(article.link)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredArticle === article.id ? "scale-110" : "scale-100"
                      }`}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>{article.date}</span>
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-5 flex-grow">{article.excerpt}</p>

                    <div className="inline-flex items-center justify-center mt-auto text-green-500 font-medium hover:text-green-600 transition-colors group">
                      Read Full Article
                      <span
                        className={`inline-block ml-1 transition-transform duration-300 ${
                          hoveredArticle === article.id ? "translate-x-1 -translate-y-1" : ""
                        }`}
                      >
                        <ArrowUpRight />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
                <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-green-100 to-green-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-\">

        </div>
    </div>
    </section>
</div>
)};
// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { useRouter } from "next/navigation"

// // Custom Arrow Icon Component
// const ArrowUpRight = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="h-4 w-4"
//   >
//     <path d="M7 7h10v10" />
//     <path d="M7 17 17 7" />
//   </svg>
// )

// export default function About() {
//   const router = useRouter()
//   const [activeCategory, setActiveCategory] = useState("all")
//   const [filteredNews, setFilteredNews] = useState([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [hoveredArticle, setHoveredArticle] = useState(null)

//   // Exercise news data - expanded to 20 articles
//   const exerciseNews = [
//     {
//       id: 1,
//       title: "The Science Behind High-Intensity Interval Training",
//       category: "cardio",
//       image:
//         "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "April 8, 2025",
//       excerpt:
//         "New research reveals why HIIT workouts produce remarkable results in less time than traditional cardio exercises.",
//       readTime: "5 min read",
//       link: "/articles/hiit-science",
//     },
//     {
//       id: 2,
//       title: "Strength Training Fundamentals for Beginners",
//       category: "strength",
//       image:
//         "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "April 5, 2025",
//       excerpt:
//         "Learn the essential principles of strength training to build muscle effectively and safely as a beginner.",
//       readTime: "7 min read",
//       link: "/articles/strength-fundamentals",
//     },
//     {
//       id: 3,
//       title: "Yoga for Athletic Recovery: A Comprehensive Guide",
//       category: "flexibility",
//       image:
//         "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1220&q=80",
//       date: "April 2, 2025",
//       excerpt:
//         "Discover how incorporating yoga into your routine can enhance recovery and improve overall athletic performance.",
//       readTime: "6 min read",
//       link: "/articles/yoga-recovery",
//     },
//     {
//       id: 4,
//       title: "Nutrition Timing: When to Eat for Maximum Exercise Results",
//       category: "nutrition",
//       image:
//         "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80",
//       date: "March 30, 2025",
//       excerpt:
//         "The latest research on optimal meal timing around workouts to maximize energy, performance, and recovery.",
//       readTime: "8 min read",
//       link: "/articles/nutrition-timing",
//     },
//     {
//       id: 5,
//       title: "The Mental Benefits of Regular Exercise",
//       category: "wellness",
//       image:
//         "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
//       date: "March 27, 2025",
//       excerpt: "How consistent physical activity impacts brain health, mood regulation, and cognitive function.",
//       readTime: "5 min read",
//       link: "/articles/mental-benefits",
//     },
//     {
//       id: 6,
//       title: "Functional Training: Exercises That Improve Daily Life",
//       category: "strength",
//       image:
//         "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "March 24, 2025",
//       excerpt:
//         "Why functional fitness training matters and how it translates to better performance in everyday activities.",
//       readTime: "6 min read",
//       link: "/articles/functional-training",
//     },
//     {
//       id: 7,
//       title: "The Ultimate Guide to Running Form and Technique",
//       category: "cardio",
//       image:
//         "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "March 21, 2025",
//       excerpt:
//         "Improve your running efficiency, prevent injuries, and enhance performance with proper form techniques.",
//       readTime: "7 min read",
//       link: "/articles/running-form",
//     },
//     {
//       id: 8,
//       title: "Overcoming Workout Plateaus: Strategies That Work",
//       category: "wellness",
//       image:
//         "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
//       date: "March 18, 2025",
//       excerpt:
//         "Effective methods to break through fitness plateaus and continue making progress in your exercise journey.",
//       readTime: "6 min read",
//       link: "/articles/overcoming-plateaus",
//     },
//     {
//       id: 9,
//       title: "Mobility vs. Flexibility: Understanding the Difference",
//       category: "flexibility",
//       image:
//         "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "March 15, 2025",
//       excerpt:
//         "Clarifying the important distinctions between mobility and flexibility and why both matter for fitness.",
//       readTime: "5 min read",
//       link: "/articles/mobility-flexibility",
//     },
//     {
//       id: 10,
//       title: "Hydration Strategies for Optimal Exercise Performance",
//       category: "nutrition",
//       image:
//         "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "March 12, 2025",
//       excerpt:
//         "The science of proper hydration before, during, and after workouts to maximize performance and recovery.",
//       readTime: "6 min read",
//       link: "/articles/hydration-strategies",
//     },
//     {
//       id: 11,
//       title: "The Power of Compound Exercises for Total Body Strength",
//       category: "strength",
//       image:
//         "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "March 9, 2025",
//       excerpt:
//         "Why exercises like squats, deadlifts, and bench presses should be the foundation of your strength routine.",
//       readTime: "7 min read",
//       link: "/articles/compound-exercises",
//     },
//     {
//       id: 12,
//       title: "Mindful Running: Combining Meditation with Movement",
//       category: "cardio",
//       image:
//         "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "March 6, 2025",
//       excerpt:
//         "How practicing mindfulness during your runs can enhance performance and create a deeper mind-body connection.",
//       readTime: "5 min read",
//       link: "/articles/mindful-running",
//     },
//     {
//       id: 13,
//       title: "Anti-Inflammatory Foods for Faster Exercise Recovery",
//       category: "nutrition",
//       image:
//         "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "March 3, 2025",
//       excerpt:
//         "The best foods to include in your diet to reduce inflammation, speed recovery, and optimize performance.",
//       readTime: "6 min read",
//       link: "/articles/anti-inflammatory-foods",
//     },
//     {
//       id: 14,
//       title: "Pilates for Core Strength: Beyond the Basics",
//       category: "flexibility",
//       image:
//         "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "February 28, 2025",
//       excerpt:
//         "Advanced Pilates techniques to strengthen your core, improve posture, and enhance overall body control.",
//       readTime: "7 min read",
//       link: "/articles/pilates-core-strength",
//     },
//     {
//       id: 15,
//       title: "Sleep and Exercise: The Critical Connection",
//       category: "wellness",
//       image:
//         "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
//       date: "February 25, 2025",
//       excerpt:
//         "How quality sleep impacts exercise performance and why athletes should prioritize sleep as part of training.",
//       readTime: "8 min read",
//       link: "/articles/sleep-exercise-connection",
//     },
//     {
//       id: 16,
//       title: "Plyometric Training for Explosive Power",
//       category: "strength",
//       image:
//         "https://images.unsplash.com/photo-1434596922112-19c563067271?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "February 22, 2025",
//       excerpt:
//         "How to incorporate jumping, bounding, and explosive movements to develop power and athletic performance.",
//       readTime: "6 min read",
//       link: "/articles/plyometric-training",
//     },
//     {
//       id: 17,
//       title: "The Athlete's Guide to Intermittent Fasting",
//       category: "nutrition",
//       image:
//         "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "February 19, 2025",
//       excerpt:
//         "How to implement intermittent fasting protocols while maintaining optimal athletic performance and recovery.",
//       readTime: "9 min read",
//       link: "/articles/athletes-intermittent-fasting",
//     },
//     {
//       id: 18,
//       title: "Heart Rate Training Zones Explained",
//       category: "cardio",
//       image:
//         "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1162&q=80",
//       date: "February 16, 2025",
//       excerpt: "Understanding the five heart rate zones and how to use them to optimize your cardiovascular training.",
//       readTime: "7 min read",
//       link: "/articles/heart-rate-zones",
//     },
//     {
//       id: 19,
//       title: "Dynamic Stretching: The Ultimate Pre-Workout Routine",
//       category: "flexibility",
//       image:
//         "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "February 13, 2025",
//       excerpt: "A comprehensive guide to dynamic stretching techniques that prepare your body for optimal performance.",
//       readTime: "5 min read",
//       link: "/articles/dynamic-stretching",
//     },
//     {
//       id: 20,
//       title: "Exercise and Immunity: Boosting Your Body's Defenses",
//       category: "wellness",
//       image:
//         "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       date: "February 10, 2025",
//       excerpt:
//         "How regular exercise strengthens your immune system and the right amount of activity for immune benefits.",
//       readTime: "6 min read",
//       link: "/articles/exercise-immunity",
//     },
//   ]

//   // Handle article click
//   const handleArticleClick = (link) => {
//     router.push(link)
//   }

//   // Filter news based on category and search query
//   useEffect(() => {
//     let result = [...exerciseNews]

//     if (activeCategory !== "all") {
//       result = result.filter((item) => item.category === activeCategory)
//     }

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       result = result.filter(
//         (item) => item.title.toLowerCase().includes(query) || item.excerpt.toLowerCase().includes(query),
//       )
//     }

//     setFilteredNews(result)
//   }, [activeCategory, searchQuery])

//   // Categories for filter
//   const categories = [
//     { id: "all", label: "All Articles" },
//     { id: "cardio", label: "Cardio" },
//     { id: "strength", label: "Strength" },
//     { id: "flexibility", label: "Flexibility" },
//     { id: "nutrition", label: "Nutrition" },
//     { id: "wellness", label: "Wellness" },
//   ]

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="relative py-20 bg-gradient-to-r from-green-800 to-green-700">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute inset-0 bg-pattern bg-green-900/90 bg-opacity-80"></div>
//         </div>

//         <div className="container mx-auto px-4 md:px-6 relative z-10">
//           <div className="max-w-3xl mx-auto text-center text-white">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-block px-3 py-1 mb-4 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30"
//             >
//               <span className="text-green-100 font-medium">Latest Updates</span>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-4xl md:text-5xl font-bold mb-4"
//             >
//               Exercise & Fitness News
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-lg text-green-100 mb-8"
//             >
//               Stay updated with the latest research, trends, and advice in the world of fitness and exercise
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="relative max-w-xl mx-auto"
//             >
//               <input
//                 type="text"
//                 placeholder="Search articles..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               />
//               <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <circle cx="11" cy="11" r="8"></circle>
//                   <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//                 </svg>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Decorative Elements */}
//         <div className="absolute bottom-0 left-0 w-full overflow-hidden">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 1200 120"
//             preserveAspectRatio="none"
//             className="w-full h-16 text-white"
//             fill="currentColor"
//           >
//             <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
//           </svg>
//         </div>
//       </section>

//       {/* Category Filter */}
//       <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="flex flex-wrap justify-center gap-3">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setActiveCategory(category.id)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                   activeCategory === category.id
//                     ? "bg-green-500 text-white shadow-md transform -translate-y-0.5"
//                     : "bg-gray-100 text-green-700 hover:bg-green-100"
//                 }`}
//               >
//                 {category.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* News Articles Grid */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4 md:px-6">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {filteredNews.length > 0 ? (
//               filteredNews.map((article) => (
//                 <motion.div
//                   key={article.id}
//                   variants={itemVariants}
//                   whileHover={{ y: -10 }}
//                   onHoverStart={() => setHoveredArticle(article.id)}
//                   onHoverEnd={() => setHoveredArticle(null)}
//                   className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full transform transition-all hover:shadow-xl"
//                   onClick={() => handleArticleClick(article.link)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="relative h-64 overflow-hidden">
//                     <img
//                       src={article.image || "/placeholder.svg"}
//                       alt={article.title}
//                       className={`w-full h-full object-cover transition-transform duration-700 ${
//                         hoveredArticle === article.id ? "scale-110" : "scale-100"
//                       }`}
//                     />
//                     <div className="absolute top-4 left-4">
//                       <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
//                         {article.category}
//                       </span>
//                     </div>
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>

//                   <div className="flex-1 p-6 flex flex-col">
//                     <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
//                       <span>{article.date}</span>
//                       <span className="flex items-center">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="16"
//                           height="16"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="mr-1"
//                         >
//                           <circle cx="12" cy="12" r="10" />
//                           <polyline points="12 6 12 12 16 14" />
//                         </svg>
//                         {article.readTime}
//                       </span>
//                     </div>

//                     <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
//                       {article.title}
//                     </h3>

//                     <p className="text-gray-600 mb-5 flex-grow">{article.excerpt}</p>

//                     <div className="inline-flex items-center justify-center mt-auto text-green-500 font-medium hover:text-green-600 transition-colors group">
//                       Read Full Article
//                       <span
//                         className={`inline-block ml-1 transition-transform duration-300 ${
//                           hoveredArticle === article.id ? "translate-x-1 -translate-y-1" : ""
//                         }`}
//                       >
//                         <ArrowUpRight />
//                       </span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-16">
//                 <div className="text-5xl mb-4">🔍</div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
//                 <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for</p>
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="py-16 bg-gradient-to-r from-green-100 to-green-50">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="max-w-3xl mx-auto text-center">
//             <div className="inline-block rounded-full bg-green-200 p-3 mb-6">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="h-6 w-6 text-green-500"
//               >
//                 <rect width="20" height="16" x="2" y="4" rx="2" />
//                 <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//               </svg>
//             </div>
//             <h2 className="text-3xl font-bold text-green-800 mb-4">Stay Updated with Fitness News</h2>
//             <p className="text-lg text-green-700 mb-8">
//               Subscribe to our newsletter to receive the latest exercise tips, research findings, and fitness advice
//               directly to your inbox.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//               <input
//                 type="email"
//                 placeholder="Your email address"
//                 className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//               <button className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Back to Top Button */}
//       <motion.button
//         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         className="fixed bottom-8 right-8 bg-green-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-green-600 transition-colors"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         whileHover={{ scale: 1.1 }}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="h-6 w-6"
//         >
//           <path d="m18 15-6-6-6 6" />
//         </svg>
//       </motion.button>
//     </div>
//   )
// }
