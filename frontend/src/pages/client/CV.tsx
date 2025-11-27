import {
  Briefcase,
  Calendar,
  Code,
  Database,
  GraduationCap,
  Heart,
  Layout,
  Mail,
  MapPin,
  Phone,
  Server,
} from 'lucide-react'

const CV = () => {
  return (
    <div className="lg:h-[calc(100vh-4rem)] h-auto bg-gray-50 dark:bg-gray-900 lg:overflow-hidden">
      <div className="lg:h-full h-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:h-full h-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="lg:h-full h-auto grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left Sidebar - 1/3 width */}
            <div className="lg:col-span-1 bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black text-white p-6 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
              {/* Profile Photo */}
              <div className="flex justify-center mb-6">
                <img
                  src="/avatar.jpg"
                  alt="Nguyễn Văn Hiếu"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              {/* Name & Title */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-1">Nguyễn Văn Hiếu</h1>
                <p className="text-lg text-gray-300">Fullstack Developer</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>0388335845</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>20/11/2003</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a
                    href="mailto:hieunguyen201103@gmail.com"
                    className="hover:text-blue-300 truncate"
                  >
                    hieunguyen201103@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Hòa Xuân, Cẩm Lệ, Đà Nẵng</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Code className="w-4 h-4 flex-shrink-0" />
                  <a
                    href="https://github.com/mhieu100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 truncate"
                  >
                    github.com/mhieu100
                  </a>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2 border-b border-gray-600 pb-2">
                  <Code className="w-5 h-5" />
                  KỸ NĂNG
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Layout className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold text-sm">Frontend</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['HTML', 'CSS', 'JS', 'TS', 'React', 'Tailwind'].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-blue-900/50 text-blue-200 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="w-4 h-4 text-green-400" />
                      <span className="font-semibold text-sm">Backend</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['Java', 'Spring Boot', 'PHP', 'Laravel'].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-green-900/50 text-green-200 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-purple-400" />
                      <span className="font-semibold text-sm">Database</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['MySQL', 'Redis', 'Git', 'Postman'].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-purple-900/50 text-purple-200 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2 border-b border-gray-600 pb-2">
                  <GraduationCap className="w-5 h-5" />
                  HỌC VẤN
                </h2>
                <div>
                  <p className="font-semibold text-sm mb-1">ĐHĐN - Việt Hàn</p>
                  <p className="text-xs text-gray-300 mb-1">Công nghệ thông tin</p>
                  <p className="text-xs text-gray-400 mb-2">2021 - 2026</p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Giải nhất Hackathon ZKP</li>
                    <li>• Java Certificate FPT</li>
                  </ul>
                </div>
              </div>

              {/* Hobbies */}
              <div>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2 border-b border-gray-600 pb-2">
                  <Heart className="w-5 h-5" />
                  SỞ THÍCH
                </h2>
                <p className="text-sm text-gray-300">Chạy bộ, Xem phim, Coding</p>
              </div>
            </div>

            {/* Right Content - 2/3 width */}
            <div className="lg:col-span-2 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-gray-500">
              {/* Career Goals */}
              <section className="mb-6 px-6 pt-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 border-b-2 border-gray-300 dark:border-gray-600 pb-1">
                  <Briefcase className="w-5 h-5" />
                  MỤC TIÊU NGHỀ NGHIỆP
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Mục tiêu của tôi là trở thành Full-stack Developer chuyên nghiệp, có khả năng xây
                  dựng hệ thống web hiện đại và hiệu năng cao.
                </p>
              </section>

              {/* Experience Timeline */}
              <section className="mb-6 px-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 border-b-2 border-gray-300 dark:border-gray-600 pb-1">
                  <Briefcase className="w-5 h-5" />
                  KINH NGHIỆM
                </h2>
                <div className="relative pl-6">
                  <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600" />

                  <div className="space-y-4">
                    {/* FPT Software */}
                    <div className="relative">
                      <div className="absolute -left-[1.4rem] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white">
                              FPT Software
                            </h3>
                            <p className="text-xs text-green-700 dark:text-green-300">
                              JAVA INTERN
                            </p>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
                            7/2025 - 10/2025
                          </span>
                        </div>
                        <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                          <li>• Phát triển phần mềm với Java, Spring Boot, MySQL</li>
                          <li>• Phối hợp nhóm theo mô hình Agile/Scrum</li>
                          <li>• Xây dựng RESTful API và Unit Test với JUnit</li>
                        </ul>
                      </div>
                    </div>

                    {/* tienlt.vn */}
                    <div className="relative">
                      <div className="absolute -left-[1.4rem] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800" />
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white">
                              tienlt.vn
                            </h3>
                            <p className="text-xs text-blue-700 dark:text-blue-300">REACT INTERN</p>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                            7-2023 - 9/2023
                          </span>
                        </div>
                        <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                          <li>• Phát triển Front-end với ReactJs, HTML5, CSS3</li>
                          <li>• Tối ưu UI/UX cải thiện trải nghiệm người dùng</li>
                          <li>• Debug và quản lý mã nguồn với Git</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Projects */}
              <section className="px-6 pb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 border-b-2 border-gray-300 dark:border-gray-600 pb-1">
                  <Code className="w-5 h-5" />
                  DỰ ÁN NỔI BẬT
                </h2>
                <div className="space-y-3">
                  {/* Blockchain Project */}
                  <div className="border-l-4 border-purple-500 pl-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-r-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                        Hệ thống lập lịch tiêm chủng Blockchain
                      </h3>
                      <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        7/2024 - 10/2024
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                      Hệ thống đặt lịch tiêm chủng trực tuyến với lưu trữ dữ liệu blockchain an toàn
                      và không thể thay đổi
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <strong>Tech:</strong> React.js, Spring Boot, MySQL, Truffle, Solidity
                    </p>
                    <a
                      href="https://github.com/mhieu100/vaxsafe-blockchain.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      🔗 github.com/mhieu100/vaxsafe-blockchain.git
                    </a>
                  </div>

                  {/* Camera Project */}
                  <div className="border-l-4 border-purple-500 pl-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-r-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                        Quản lý camera streaming real-time
                      </h3>
                      <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        7/2024 - 10/2024
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                      Hệ thống quản lý và truyền tải nhiều camera đồng thời với giao diện trực quan
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <strong>Tech:</strong> React.js, Spring Boot, PostgreSQL, WebSocket, Redis,
                      Microservice
                    </p>
                    <a
                      href="https://github.com/mhieu100/camera.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      🔗 github.com/mhieu100/camera.git
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CV
