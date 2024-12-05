import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
    <div className="flex justify-center space-x-6">
      <a href="https://www.twitter.com" aria-label="Twitter" className="hover:text-gray-300">
        <FaTwitter size={24} />
      </a>
      <a href="https://www.github.com" aria-label="GitHub" className="hover:text-gray-300">
        <FaGithub size={24} />
      </a>
      <a href="https://www.linkedin.com" aria-label="LinkedIn" className="hover:text-gray-300">
        <FaLinkedin size={24} />
      </a>
    </div>
    //changed name
    <p className="text-center mt-4">© 2024 Sum-It-AI. All rights reserved.</p>
  </footer>
);

export default Footer;
