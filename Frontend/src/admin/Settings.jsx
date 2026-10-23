import { User, Mail, Shield } from "lucide-react";

const Settings = () => {
  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  return (
    <div className="max-w-5xl">

      <div>
        <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
          BYTEPOST / ADMIN
        </p>

        <h1 className="text-4xl md:text-5xl font-black mt-3">
          SETTINGS.
        </h1>

        <p className="text-gray-500 mt-3">
          Manage your BYTEPOST admin account.
        </p>
      </div>


      {/* ADMIN INFORMATION */}

      <div className="bg-white border-2 border-black mt-10">

        <div className="border-b-2 border-black p-6">
          <p className="text-xs font-black tracking-widest text-gray-500">
            ADMIN ACCOUNT
          </p>

          <h2 className="text-2xl font-black mt-2">
            Account Information
          </h2>
        </div>


        <div className="p-6 space-y-6">

          {/* NAME */}

          <div>
            <div className="flex items-center gap-2">
              <User size={17} />

              <p className="text-xs font-black tracking-widest">
                NAME
              </p>
            </div>

            <div className="border-2 border-black bg-[#F5F3EE] px-4 py-4 mt-2">
              {admin?.name || "Admin"}
            </div>
          </div>


          {/* EMAIL */}

          <div>
            <div className="flex items-center gap-2">
              <Mail size={17} />

              <p className="text-xs font-black tracking-widest">
                EMAIL
              </p>
            </div>

            <div className="border-2 border-black bg-[#F5F3EE] px-4 py-4 mt-2">
              {admin?.email || "No email"}
            </div>
          </div>

        </div>

      </div>


      {/* SECURITY */}

      <div className="bg-[#0D0D0D] text-white border-2 border-black p-6 mt-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-[#FF5C35] text-black flex items-center justify-center">
            <Shield size={20} />
          </div>

          <div>
            <p className="font-black">
              ADMIN SECURITY
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Your admin routes are protected using JWT authentication.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Settings;