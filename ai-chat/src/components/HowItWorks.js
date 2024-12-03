const HowItWorks = () => (
  <section className="py-12 bg-white">
    <h2 className="text-4xl text-center font-bold mb-8">How It Works</h2>
    <ol className="max-w-3xl mx-auto space-y-6 px-4">
      {[
        { step: "Step 1", description: "Upload your PDF securely." },
        { step: "Step 2", description: "Our AI summarizes the document." },
        { step: "Step 3", description: "Chat with AI for deeper insights." },
        { step: "Step 4", description: "Access chat history anytime." },
      ].map(({ step, description }, index) => (
        <li key={index} className="flex items-start space-x-4">
          <span className="text-blue-600 font-bold">{step}</span>
          <p className="text-gray-600">{description}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;