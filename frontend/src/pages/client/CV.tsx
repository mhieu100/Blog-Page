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
                <p className="text-lg text-gray-300">Fresher Java</p>
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
                      {['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Bootstrap', 'React'].map(
                        (skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 bg-blue-900/50 text-blue-200 rounded text-xs"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="w-4 h-4 text-green-400" />
                      <span className="font-semibold text-sm">Backend</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['Java', 'Spring Boot'].map((skill) => (
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
                      <span className="font-semibold text-sm">Tools & Others</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['MySQL', 'Redis', 'Git', 'Postman', 'Docker'].map((skill) => (
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
                  <p className="font-semibold text-sm mb-1">
                    Trường Đại học Công nghệ Thông tin & Truyền thông Việt Hàn - ĐHĐN
                  </p>
                  <p className="text-xs text-gray-400 mb-1">2021 - 2026</p>
                  <p className="text-xs text-gray-300 mb-2">Công nghệ thông tin</p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Đạt giải nhất Hackathon ZKP programming (ZKP labs)</li>
                    <li>• Java Basic Certificate FPT</li>
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
                          <li>
                            • Tham gia xây dựng tế phát triển phần mềm sử dụng Java, Spring Boot, và
                            MySQL
                          </li>
                          <li>
                            • Hỗ trợ xây dựng RESTful API và thực hiện kiểm thử đơn vị (Unit Test)
                            nhằm đảm bảo chất lượng hệ thống
                          </li>
                          <li>
                            • Làm quen với quy trình phát triển phần mềm như Git, JIRA, và Postman
                          </li>
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
                          <li>
                            • Xây dựng và phát triển các trang web bằng các công nghệ Front-end sử
                            dụng React.js, JavaScript (ES6+), HTML5, và CSS3
                          </li>
                          <li>
                            • Hỗ trợ xây dựng và mở rộng cơ sở mã nguồn (UI/UX) nhằm cải thiện tốc
                            độ và trải nghiệm người dùng
                          </li>
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
                        Hệ thống lập lịch tiêm chủng ứng dụng Blockchain (SafeVax)
                      </h3>
                      <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        7/2024 - 10/2024
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                      <strong>Fullstack developer</strong>
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                      Xây dựng hệ thống đặt lịch tiêm chủng với cơ chế lưu trữ trung tâm kết hợp
                      công nghệ blockchain để đảm bảo tính minh bạch và không thể thay đổi. Người
                      dùng đến địa phương, nộp tiếng mày tỷ đôn và quy trỉnh trong quý trinh tiêm
                      chủng. Tích hợp AI để tư vấn các loại vaccine.
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <strong>Technology:</strong> React.js and Spring Boot, Spring Security, JPA,
                      Lombok, PostgreSQL, JWT, Meta Mask, Truffle, Ganache, Spring AI, Qdrant
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <strong>Project:</strong>{' '}
                      <a
                        href="https://github.com/mhieu100/vaxsafe-blockchain.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        https://github.com/mhieu100/vaxsafe-blockchain.git
                      </a>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Deploy:</strong>{' '}
                      <a
                        href="https://safevax.mhieu100.space"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        https://safevax.mhieu100.space
                      </a>
                    </p>
                  </div>

                  {/* Camera Project */}
                  <div className="border-l-4 border-purple-500 pl-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-r-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                        Quản lý suất ăn dài liệu phát tục truyền camera theo real time gian thực
                      </h3>
                      <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        7/2024 - 10/2024
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                      <strong>Fullstack developer</strong>
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                      Hệ thống quản lý và truyền tài camera thẻo thời gian thực. Người dùng có thể
                      đăng ký camera cùng tần thần kiếm tra. Giao diện trực quan cho phéo xem trực
                      tiếp. Hệ thống được cải thiện đăng tài
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <strong>Technology:</strong> React.js, Spring Boot, Spring Security, JPA,
                      Lombok, PostgreSQL, Websocket, Microservice
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Project:</strong>{' '}
                      <a
                        href="https://github.com/mhieu100/internShip.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        https://github.com/mhieu100/internShip.git
                      </a>
                    </p>
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
