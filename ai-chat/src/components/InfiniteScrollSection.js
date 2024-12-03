import { useState, useEffect } from 'react';

const InfiniteScrollSection = () => {
  const [items, setItems] = useState(Array.from({ length: 6 }));
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setItems((prev) => [...prev, ...Array.from({ length: 6 })]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-white py-12">
      <h2 className="text-4xl text-center font-bold mb-8">More Features</h2>
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3 px-4">
        {items.map((_, index) => (
          <div key={index} className="bg-gray-100 p-6 shadow rounded-lg animate-fade-in">
            <h3 className="text-2xl font-bold">Feature {index + 1}</h3>
            <p className="mt-2 text-gray-600">Description for feature {index + 1}.</p>
          </div>
        ))}
      </div>
      {isLoading && <p className="text-center mt-4">Loading more features...</p>}
    </section>
  );
};

export default InfiniteScrollSection;