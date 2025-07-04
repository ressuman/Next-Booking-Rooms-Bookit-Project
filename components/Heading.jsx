export default function Heading({ title }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"></div>
    </div>
  );
}
