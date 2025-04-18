"use client"

import { motion } from "framer-motion"
import { Trophy, Users, BookOpen, Heart, Brain, Dumbbell } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/autoplay"
import { Autoplay } from "swiper/modules"

export default function AboutSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      role: "Sports Director",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3",
      bio: "Former national athlete with 15+ years of experience in sports management and coaching.",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Head Coach",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      bio: "Olympic medalist who has trained over 200 college athletes to state and national competitions.",
    },
    {
      id: 3,
      name: "Amit Desai",
      role: "Fitness Coordinator",
      image:
        "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      bio: "Certified fitness expert specializing in sports-specific training and injury prevention.",
    },
    {
      id: 4,
      name: "Neha Kapoor",
      role: "Sports Nutritionist",
      image:
        "https://images.unsplash.com/photo-1619011617408-98e952aaf7e4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      bio: "Helps athletes optimize their performance through personalized nutrition plans.",
    },
  ]

  // Core values data
  const coreValues = [
    {
      id: 1,
      icon: <Trophy className="h-8 w-8 text-green-500" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of sports, from training to competition.",
    },
    {
      id: 2,
      icon: <Heart className="h-8 w-8 text-green-500" />,
      title: "Passion",
      description: "Our love for sports drives us to create exceptional experiences for all athletes.",
    },
    {
      id: 3,
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Teamwork",
      description: "We believe in the power of collaboration to achieve common goals.",
    },
    {
      id: 4,
      icon: <Brain className="h-8 w-8 text-green-500" />,
      title: "Innovation",
      description: "Constantly seeking new ways to improve sports programs and athlete development.",
    },
    {
      id: 5,
      icon: <Dumbbell className="h-8 w-8 text-green-500" />,
      title: "Discipline",
      description: "Building character through consistent practice and dedication to improvement.",
    },
    {
      id: 6,
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      title: "Education",
      description: "Promoting learning and growth both on and off the field.",
    },
  ]

  // Milestones data
  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      description: "Zeal College Sports Department was established with just 3 sports disciplines.",
    },
    {
      year: "2013",
      title: "First State Championship",
      description: "Our basketball team won the state championship, putting us on the map.",
    },
    {
      year: "2016",
      title: "Facility Expansion",
      description: "Opened our state-of-the-art indoor sports complex and training center.",
    },
    {
      year: "2019",
      title: "National Recognition",
      description: "Recognized as one of the top 10 college sports programs in the country.",
    },
    {
      year: "2022",
      title: "Digital Transformation",
      description: "Launched Sportyfy platform to connect our sports community digitally.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-800 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-pattern opacity-10"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block px-3 py-1 mb-4 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
              <span className="text-green-100 font-medium">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Athletes, Building Champions</h1>
            <p className="text-xl text-green-100 mb-8">
              At Zeal College, we're dedicated to fostering a culture of athletic excellence, personal growth, and
              community spirit through our comprehensive sports programs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-4 bg-green-100 px-4 py-1.5 rounded-full">
                <span className="text-green-700 font-medium">Our Story</span>
              </div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">A Legacy of Sporting Excellence</h2>
              <div className="prose text-green-700 max-w-none">
                <p>
                  Founded in 2010, Zeal College's sports department began with a simple mission: to provide students
                  with opportunities to excel in athletics while maintaining academic excellence. What started with just
                  three sports disciplines has now grown into a comprehensive program offering over 10 different sports.
                </p>
                <p className="mt-4">
                  Our journey has been marked by continuous growth, numerous achievements, and a steadfast commitment to
                  developing well-rounded athletes. We believe that sports are not just about physical prowess but also
                  about building character, discipline, and teamwork.
                </p>
                <p className="mt-4">
                  Today, Sportyfy serves as the digital extension of our physical sports ecosystem, connecting athletes,
                  coaches, and sports enthusiasts in our college community. We're proud of how far we've come and
                  excited about where we're headed.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="College sports team celebrating"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-green-100">
                <div className="flex items-center gap-2">
                  <Trophy className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-green-800 font-bold text-xl">12+ Years</p>
                    <p className="text-green-600 text-sm">of sporting excellence</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-green-100">
                <div className="flex items-center gap-2">
                  <Users className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-green-800 font-bold text-xl">500+</p>
                    <p className="text-green-600 text-sm">active athletes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4 bg-green-100 px-4 py-1.5 rounded-full">
              <span className="text-green-700 font-medium">Our Purpose</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-green-800 mb-4">
              Mission & Vision
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md border border-green-100 hover:border-green-300 transition-colors"
            >
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mr-4">
                  <Trophy className="h-6 w-6 text-green-500" />
                </div>
                Our Mission
              </h3>
              <p className="text-green-700">
                To provide a supportive and competitive environment where student-athletes can develop their sporting
                talents, leadership skills, and personal character while pursuing academic excellence. We aim to make
                sports an integral part of the college experience, fostering physical fitness, mental well-being, and
                community spirit.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md border border-green-100 hover:border-green-300 transition-colors"
            >
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-green-500" />
                </div>
                Our Vision
              </h3>
              <p className="text-green-700">
                To be recognized as a premier collegiate sports program that consistently produces well-rounded athletes
                who excel both in their chosen sports and academic pursuits. We envision creating a legacy of sporting
                excellence, innovation in athletic training, and a vibrant community that celebrates the transformative
                power of sports.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4 bg-green-100 px-4 py-1.5 rounded-full">
              <span className="text-green-700 font-medium">What We Stand For</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-green-800 mb-4">
              Our Core Values
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-green-700">
              These principles guide everything we do at Zeal College Sports
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value) => (
              <motion.div
                key={value.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:border-green-300 transition-colors"
              >
                <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">{value.title}</h3>
                <p className="text-green-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block mb-4 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm"
            >
              <span className="text-green-100 font-medium">Our Journey</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
              Key Milestones
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-green-200">
              Tracing our path from humble beginnings to sporting excellence
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-500/30"></div>

            {/* Timeline items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} md:justify-between`}
                >
                  <div className={`hidden md:block w-5/12 ${index % 2 === 0 ? "text-right" : "order-1"}`}>
                    {index % 2 === 0 ? (
                      <div className="pr-8">
                        <h3 className="text-xl font-bold text-green-300">{milestone.title}</h3>
                        <p className="text-green-200 mt-2">{milestone.description}</p>
                      </div>
                    ) : (
                      <div className="invisible">Spacer</div>
                    )}
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="rounded-full bg-green-500 w-10 h-10 flex items-center justify-center z-10">
                      <span className="font-bold text-white">{milestone.year}</span>
                    </div>
                  </div>

                  <div className={`md:w-5/12 ${index % 2 === 0 ? "md:invisible" : "md:pl-8"} md:order-1 pl-16 md:pl-0`}>
                    <div className="md:hidden absolute left-16 top-0">
                      <h3 className="text-xl font-bold text-green-300">{milestone.title}</h3>
                      <p className="text-green-200 mt-2">{milestone.description}</p>
                    </div>
                    <div className="hidden md:block">
                      {index % 2 !== 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-green-300">{milestone.title}</h3>
                          <p className="text-green-200 mt-2">{milestone.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4 bg-green-100 px-4 py-1.5 rounded-full">
              <span className="text-green-700 font-medium">Our Leadership</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-green-800 mb-4">
              Meet Our Team
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-green-700">
              The dedicated professionals behind Zeal College's sports success
            </motion.p>
          </motion.div>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-8"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 group h-full"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-800">{member.name}</h3>
                    <p className="text-green-500 font-medium mb-3">{member.role}</p>
                    <p className="text-green-700">{member.bio}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-green-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Join Our Sports Community</h2>
              <p className="text-green-700">
                Whether you're an athlete looking to compete, a sports enthusiast, or someone who wants to stay updated
                with college sports events, we welcome you to be part of our journey.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">For Athletes</h3>
                <p className="text-green-700 mb-4">Join our teams and represent Zeal College in competitions</p>
                <></>
              </div>
              <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">For Supporters</h3>
                <p className="text-green-700 mb-4">Attend events, cheer for our teams, and be part of our community</p>
                <></>
              </div>
              <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">For Partners</h3>
                <p className="text-green-700 mb-4">Collaborate with us to promote sports and wellness</p>
                <></>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
