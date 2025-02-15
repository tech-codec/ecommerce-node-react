const { v4: uuidv4 } = require('uuid');
const Visit = require('../models/Visit');
require('dotenv').config();

const recordVisit = async (req, res, next) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(23, 59, 59, 999);  // Fixer l'heure à la fin de la journée

    // Charger les URLs client et admin depuis les variables d'environnement
    const clientUrl = process.env.CLIENT_URL;
    const adminUrl = process.env.ADMIN_URL;

    // Exclure les requêtes provenant de l'URL admin
    if (req.headers.origin === adminUrl) {
      return next();
    }

    // Vérifiez si le visiteur a déjà un cookie d'identification unique
    let visitorId = req.cookies.visitorId;
    if (!visitorId) {
      visitorId = uuidv4();
      res.cookie('visitorId', visitorId, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });  // Cookie valide pour 1 jour
    }

    // Déterminez la source de la visite
    let source = 'direct';
    if (req.headers.referer) {
      const referer = req.headers.referer.toLowerCase();
      if (referer.includes('google') || referer.includes('bing') || referer.includes('yahoo') || referer.includes('duckduckgo') || referer.includes('baidu') || referer.includes('yandex')) {
        source = 'search';
      } else if (referer.includes(req.hostname)) {
        source = 'direct';
      } else if (referer.includes('facebook') || referer.includes('twitter') || referer.includes('linkedin') || referer.includes('instagram') || referer.includes('pinterest')) {
        source = 'social';
      } else {
        source = 'referral';
      }
    } else if (req.headers['user-agent']) {
      const userAgent = req.headers['user-agent'].toLowerCase();
      if (userAgent.includes('facebook') || userAgent.includes('twitter') || userAgent.includes('linkedin') || userAgent.includes('instagram') || userAgent.includes('pinterest')) {
        source = 'social';
      }
    }

    // Trouvez ou créez un document de visite pour la date actuelle et la source
    let visit = await Visit.findOne({ date: currentDate, source });
    if (!visit) {
      visit = new Visit({
        date: currentDate,
        visitors: 0,
        pageViews: 0,
        source
      });
    }

    // Incrémentez les compteurs de visiteurs si le cookie 'visitor' n'existe pas
    if (!req.cookies.visitor) {
      visit.visitors += 1;
      res.cookie('visitor', 'true', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });  // Cookie valide pour 1 jour
    }

    // Générer un nom de cookie unique pour chaque page visitée
    const pageViewedCookie = `pageViewed_${req.path.replace(/\//g, '_')}`;

    // Incrémentez le compteur de pages vues si le cookie unique pour cette page n'existe pas
    if (!req.cookies[pageViewedCookie]) {
      visit.pageViews += 1;
      res.cookie(pageViewedCookie, 'true', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });  // Cookie valide pour 1 jour
    }

    // Sauvegardez les modifications
    await visit.save();
    next();
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la visite:', error);
    next(error);
  }
};


module.exports = recordVisit;