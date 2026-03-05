import { useContact } from "../../hooks/useContact";

export const Contact = () => {
  const {
    formData,
    setFormData,
    status,
    statusMessage,
    metrics,
    setHoveredSocial,
    focusedField,
    setFocusedField,
    isFormValid,
    isValidEmail,
    handleSubmit,
    socials,
    MAX_MESSAGE_LENGTH,
  } = useContact();

  return (
    <div className="w-full flex justify-center px-4 py-8 animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-w-[90vw] xl:max-w-5xl">
        {/* Glassy Container with enhanced effects */}
        <div className="relative border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 shadow-2xl backdrop-blur-2xl rounded-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
          {/* Animated gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          {/* Subtle animated orbs */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}></div>

          <div className="relative bg-gradient-to-br from-white/60 to-white/40 dark:from-[#22252a]/60 dark:to-[#1a1d21]/60 min-h-[500px] backdrop-blur-xl transition-colors duration-300 flex flex-col">
            {/* Window Header - Glassy */}
            <div className="w-full h-14 bg-white/50 dark:bg-black/30 backdrop-blur-xl flex items-center justify-between px-6 border-b border-white/30 dark:border-white/10 sticky top-0 z-30 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50 shadow-lg hover:shadow-red-500/50 hover:scale-110 transition-all cursor-pointer backdrop-blur-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50 shadow-lg hover:shadow-yellow-500/50 hover:scale-110 transition-all cursor-pointer backdrop-blur-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50 shadow-lg hover:shadow-green-500/50 hover:scale-110 transition-all cursor-pointer backdrop-blur-sm"></div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-black/30 backdrop-blur-md rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300 border border-white/30 dark:border-white/10 shadow-lg">
                  <span className="material-icons text-[16px] text-purple-600 dark:text-purple-400">
                    mail
                  </span>
                  <span className="font-semibold">contact_me.sh</span>
                </div>
              </div>

              {/* Header Stats */}
              <div className="hidden md:flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/40 dark:bg-black/30 backdrop-blur-md rounded-lg border border-white/30 dark:border-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Content Area - Enhanced glassy sections */}
            <div className="p-6 sm:p-10 md:p-12 flex flex-col lg:flex-row gap-12 flex-1">
              {/* Left: The Form (Script Style) - Glassy */}
              <div className="flex-1">
                {/* Header with gradient */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Get In Touch
                    </h2>
                  </div>
                  <div className="font-mono text-sm text-gray-600 dark:text-gray-400 ml-16 space-y-1">
                    <p>
                      <span className="text-gray-400">#</span> Initialize
                      communication protocol
                    </p>
                    <p>
                      <span className="text-gray-400">#</span> Fill parameters
                      to establish connection
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 font-mono text-sm">
                  {/* Name Input */}
                  <div className="group">
                    <label className="block text-purple-600 dark:text-purple-400 mb-2 font-semibold flex items-center gap-2">
                      <span className="material-icons text-[14px]">person</span>
                      sender_name{" "}
                      <span className="text-gray-400 font-normal">=</span>
                      {formData.name && (
                        <span className="material-icons text-[14px] text-green-500">
                          check
                        </span>
                      )}
                    </label>
                    <div
                      className={`relative flex items-center bg-white/60 dark:bg-black/30 backdrop-blur-xl border rounded-xl px-4 py-3 transition-all group-hover:bg-white/70 dark:group-hover:bg-black/40 ${
                        focusedField === "name"
                          ? "border-purple-500/50 dark:border-purple-400/50 shadow-lg shadow-purple-500/20"
                          : "border-white/40 dark:border-white/10"
                      }`}>
                      <span className="text-green-600 dark:text-green-400 mr-2 text-base">
                        "
                      </span>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="bg-transparent w-full outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-500"
                        placeholder="John Doe"
                        autoComplete="name"
                      />
                      <span className="text-green-600 dark:text-green-400 text-base">
                        "
                      </span>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-purple-600 dark:text-purple-400 mb-2 font-semibold flex items-center gap-2">
                      <span className="material-icons text-[14px]">email</span>
                      sender_email{" "}
                      <span className="text-gray-400 font-normal">=</span>
                      {formData.email && isValidEmail(formData.email) && (
                        <span className="material-icons text-[14px] text-green-500">
                          check
                        </span>
                      )}
                      {formData.email && !isValidEmail(formData.email) && (
                        <span className="material-icons text-[14px] text-red-500">
                          close
                        </span>
                      )}
                    </label>
                    <div
                      className={`relative flex items-center bg-white/60 dark:bg-black/30 backdrop-blur-xl border rounded-xl px-4 py-3 transition-all group-hover:bg-white/70 dark:group-hover:bg-black/40 ${
                        focusedField === "email"
                          ? "border-blue-500/50 dark:border-blue-400/50 shadow-lg shadow-blue-500/20"
                          : formData.email && !isValidEmail(formData.email)
                          ? "border-red-500/50"
                          : "border-white/40 dark:border-white/10"
                      }`}>
                      <span className="text-green-600 dark:text-green-400 mr-2 text-base">
                        "
                      </span>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="bg-transparent w-full outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-500"
                        placeholder="john@example.com"
                        autoComplete="email"
                      />
                      <span className="text-green-600 dark:text-green-400 text-base">
                        "
                      </span>
                    </div>
                    {formData.email && !isValidEmail(formData.email) && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <span className="material-icons text-[12px]">
                          error
                        </span>
                        Invalid email format
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-2">
                        <span className="material-icons text-[14px]">
                          message
                        </span>
                        message_content{" "}
                        <span className="text-gray-400 font-normal">=</span>
                        {formData.message.length >= 10 && (
                          <span className="material-icons text-[14px] text-green-500">
                            check
                          </span>
                        )}
                      </label>
                      <span
                        className={`text-xs ${
                          formData.message.length > MAX_MESSAGE_LENGTH * 0.9
                            ? "text-red-500"
                            : formData.message.length > MAX_MESSAGE_LENGTH * 0.7
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}>
                        {formData.message.length}/{MAX_MESSAGE_LENGTH}
                      </span>
                    </div>
                    <div
                      className={`relative bg-white/60 dark:bg-black/30 backdrop-blur-xl border rounded-xl p-4 transition-all group-hover:bg-white/70 dark:group-hover:bg-black/40 ${
                        focusedField === "message"
                          ? "border-pink-500/50 dark:border-pink-400/50 shadow-lg shadow-pink-500/20"
                          : "border-white/40 dark:border-white/10"
                      }`}>
                      <span className="absolute top-4 left-4 text-green-600 dark:text-green-400 text-base">
                        """
                      </span>
                      <textarea
                        required
                        rows={5}
                        maxLength={MAX_MESSAGE_LENGTH}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className="bg-transparent w-full outline-none text-gray-800 dark:text-white resize-none pl-8 pt-1 placeholder-gray-500 dark:placeholder-gray-500 font-sans leading-relaxed"
                        placeholder="Type your message here..."
                      />
                      <span className="absolute bottom-4 right-4 text-green-600 dark:text-green-400 text-base">
                        """
                      </span>
                    </div>
                    {/* Progress bar for message length */}
                    <div className="mt-2 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          formData.message.length > MAX_MESSAGE_LENGTH * 0.9
                            ? "bg-red-500"
                            : formData.message.length > MAX_MESSAGE_LENGTH * 0.7
                            ? "bg-yellow-500"
                            : "bg-gradient-to-r from-green-500 to-blue-500"
                        }`}
                        style={{
                          width: `${
                            (formData.message.length / MAX_MESSAGE_LENGTH) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status !== "idle" || !isFormValid}
                    className={`group/btn relative mt-6 px-8 py-4 text-white border border-white/30 rounded-xl flex items-center gap-3 transition-all w-full justify-center font-semibold shadow-lg backdrop-blur-xl overflow-hidden ${
                      !isFormValid
                        ? "bg-gray-400 cursor-not-allowed opacity-60"
                        : "bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 hover:shadow-xl hover:scale-105 active:scale-95"
                    } disabled:hover:scale-100`}>
                    {/* Shimmer effect */}
                    {isFormValid && status === "idle" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                    )}

                    {status === "idle" && (
                      <>
                        <span className="material-icons text-lg">send</span>
                        <span>execute_script()</span>
                      </>
                    )}
                    {status === "sending" && (
                      <>
                        <span className="material-icons text-lg animate-spin">
                          sync
                        </span>
                        <span>sending...</span>
                      </>
                    )}
                    {status === "success" && (
                      <>
                        <span className="material-icons text-lg">
                          check_circle
                        </span>
                        <span>Message sent successfully! ✓</span>
                      </>
                    )}
                    {status === "error" && (
                      <>
                        <span className="material-icons text-lg">error</span>
                        <span>Failed to send. Try again.</span>
                      </>
                    )}
                  </button>

                  {/* Form hint */}
                  {!isFormValid && status === "idle" && (
                    <p className="text-center text-xs text-gray-500 mt-2">
                      Fill all fields to enable submission
                    </p>
                  )}

                  {/* BE status message */}
                  {statusMessage && status === "success" && (
                    <p className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5 mt-2 font-mono">
                      <span className="material-icons text-[14px] shrink-0">
                        check_circle
                      </span>
                      {statusMessage}
                    </p>
                  )}

                  {statusMessage && status === "error" && (
                    <p className="flex items-center gap-2 text-xs text-red-500 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 mt-2 font-mono">
                      <span className="material-icons text-[14px] shrink-0">
                        error_outline
                      </span>
                      {statusMessage}
                    </p>
                  )}
                </form>
              </div>

              {/* Right: Network Info (Socials) - Glassy */}
              <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/20 dark:border-white/10 pt-8 lg:pt-0 lg:pl-10 flex flex-col gap-8">
                {/* Social Links */}
                <div>
                  <h3 className="text-xs font-mono uppercase text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2 font-bold tracking-wider">
                    <span className="material-icons text-[14px]">link</span>
                    Network_Origins
                  </h3>
                  <div className="space-y-4">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => setHoveredSocial(social.name)}
                        onMouseLeave={() => setHoveredSocial(null)}
                        className="group/social relative flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300 hover:text-white transition-all p-3 rounded-xl bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 hover:border-white/60 dark:hover:border-white/30 hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden">
                        {/* Gradient background on hover */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover/social:opacity-100 transition-opacity duration-300`}></div>

                        {/* Icon */}
                        <div className="relative z-10 p-2.5 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-lg group-hover/social:bg-white/20 transition-all group-hover/social:scale-110 shadow-md">
                          <span className="material-icons text-lg">
                            {social.icon}
                          </span>
                        </div>

                        {/* Label */}
                        <span className="relative z-10 font-mono font-semibold group-hover/social:translate-x-1 transition-transform">
                          {social.label}
                        </span>

                        {/* Arrow */}
                        <span className="relative z-10 material-icons text-sm ml-auto opacity-0 group-hover/social:opacity-100 transition-all -translate-x-2 group-hover/social:translate-x-0">
                          arrow_forward
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Server Status */}
                <div className="mt-auto p-5 bg-gradient-to-br from-white/50 to-white/30 dark:from-black/30 dark:to-black/20 backdrop-blur-xl rounded-xl border border-white/40 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono text-gray-600 dark:text-gray-400 uppercase font-bold tracking-wider">
                      Server Status
                    </span>
                  </div>

                  <div className="font-mono text-xs space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-white/40 dark:bg-black/20 backdrop-blur-sm">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span className="material-icons text-[12px]">
                          public
                        </span>
                        Region:
                      </span>
                      <span className="text-gray-700 dark:text-gray-200 font-semibold">
                        LAG-NG
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded-lg bg-white/40 dark:bg-black/20 backdrop-blur-sm">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span className="material-icons text-[12px]">
                          schedule
                        </span>
                        Uptime:
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {metrics.uptime}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded-lg bg-white/40 dark:bg-black/20 backdrop-blur-sm">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span className="material-icons text-[12px]">
                          speed
                        </span>
                        Latency:
                      </span>
                      <span
                        className={`font-semibold flex items-center gap-1 ${
                          metrics.latency > 60
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-green-600 dark:text-green-400"
                        }`}>
                        {metrics.latency}ms
                        {metrics.latency > 60 ? (
                          <span className="material-icons text-[12px]">
                            warning
                          </span>
                        ) : (
                          <span className="material-icons text-[12px]">
                            check_circle
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
