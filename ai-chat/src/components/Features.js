import { CloudUploadIcon, ChatAlt2Icon, ShieldCheckIcon } from '@heroicons/react/outline';

const features = [
  {
    title: "Secure PDF Uploads",
    description: "Your data is encrypted and securely stored.",
    icon: ShieldCheckIcon,
  },
  {
    title: "AI Summarization",
    description: "Get instant summaries of lengthy documents.",
    icon: ChatAlt2Icon,
  },
  {
    title: "Contextual Chat",
    description: "Ask questions and get answers from your documents.",
    icon: CloudUploadIcon,
  },
];

const Features = () => (
  <section className="bg-gray-100 py-12">
    <h2 className="text-4xl text-center font-bold mb-8">Features</h2>
    <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 px-4">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition">
          <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-2xl font-semibold">{feature.title}</h3>
          <p className="mt-2 text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features;