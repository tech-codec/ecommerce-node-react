import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo-3.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-3 pt-10 pb-24 md:py-10 px-5 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        {/* Section Navigation */}
        <div>
          <h3 className="font-bold text-lg mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline hover:text-orange-500">Accueil</Link></li>
            <li><Link to="/shop" className="hover:underline hover:text-orange-500">Boutique</Link></li>
            <li><Link to="/cart" className="hover:underline hover:text-orange-500">Panier</Link></li>
          </ul>
        </div>
        
        {/* Section Catégories */}
        <div>
          <h3 className="font-bold text-lg mb-3">Catégories</h3>
          <ul className="space-y-2">
            <li><Link to="/télévision" className="hover:underline hover:text-orange-500">Télévision</Link></li>
            <li><Link to="/ordinateur" className="hover:underline hover:text-orange-500">Ordinateur</Link></li>
            <li><Link to="/vêtement" className="hover:underline hover:text-orange-500">Vêtement</Link></li>
            <li><Link to="/téléphone" className="hover:underline hover:text-orange-500">Téléphone</Link></li>
          </ul>
        </div>
        
        {/* Section Compte */}
        <div>
          <h3 className="font-bold text-lg mb-3">Mon Compte</h3>
          <ul className="space-y-2">
            <li><Link to="/dashboard" className="hover:underline hover:text-orange-500">Tableau de Bord</Link></li>
            <li><Link to="/signIn" className="hover:underline hover:text-orange-500">Se Connecter</Link></li>
            <li><Link to="/signUp" className="hover:underline hover:text-orange-500">S'inscrire</Link></li>
          </ul>
        </div>
        
        {/* Section Contact */}
        <div>
          <h3 className="font-bold text-lg mb-3">Contact</h3>
          <p className="text-gray-300">Besoin d'aide ? Contactez-nous.</p>
        </div>
      </div>
      
      {/* Partie basse avec le logo et les droits */}
      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
        <p className="text-sm text-gray-400 mt-3">
          &copy; {new Date().getFullYear()} TechCodec. Tous droits réservés.
        </p>
        <div className="flex space-x-4 mt-4">
          <a href="https://github.com/tech-codec" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/varus-emegni-limogne-223a3918b" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-white">
            <FaLinkedin size={24} />
          </a>
          <a href="https://www.youtube.com/@TechcodecEmegni" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-white">
            <FaYoutube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;