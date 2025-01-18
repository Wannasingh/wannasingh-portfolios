export default function ToolsSection() {
  const tools = ["Figma", "Framer", "Webflow", "Notion", "Lottie"];

  return (
    <section className="py-6 border-y border-[#E5E5E5]">
      <div className="container mx-auto px-4">
        <ul className="flex justify-between items-center">
          {tools.map((tool) => (
            <li key={tool} className="text-sm text-gray-500">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
