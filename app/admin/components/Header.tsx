export default function Header() {
  return (
    <header className="text-center mb-6">

      {/* لوگو */}
      <div className="flex justify-center mb-3">
        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center shadow">
          <span className="text-3xl">🌸</span>
        </div>
      </div>

      {/* عنوان */}
      <h1 className="text-4xl font-extrabold text-purple-700">
        هانا
      </h1>

      {/* زیرعنوان */}
      <p className="text-gray-600 mt-1 text-base">
        پنل مدیریت تولید
      </p>

      {/* خط جداکننده */}
      <div className="mt-4 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-purple-600"></div>

    </header>
  );
}