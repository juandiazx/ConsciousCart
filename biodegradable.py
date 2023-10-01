import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

nltk.download('wordnet')
nltk.download('punkt')
nltk.download('stopwords')

bio_friendly_materials_set = {
    "recyclable", "reusable", "compostable", "biodegradable", "sustainable", "green", 
    "organic", "renewable", "natural", "bamboo", "hemp", "jute", "cotton", "linen", 
    "wool", "silk", "cork", "soy", "paper", "cardboard", "glass", "metal", "aluminium", 
    "steel", "copper", "brass", "tin", "bioplastic", "upcycled", "solar", "wind", 
    "eco", "ethical", "fairtrade", "vegan", "clean", "pure", "untreated", "unbleached", 
    "undyed", "refillable", "degradable", "local", "handmade", "artisan", "bulk", 
    "conservation", "restoration", "biodiversity", "regenerative", "marine", "ocean", 
    "sea", "river", "lake", "stream", "air", "emission", "renewable", "alternative", 
    "biofuel", "hydropower", "hydroelectric", "solar", "wind", "geothermal", "bio", 
    "wave", "tidal", "electric", "hybrid", "bicycle", "walking", "public", "carpool", 
    "telecommuting", "videoconferencing", "remote", "wfh", "reforestation", "afforestation", 
    "protection", "forest", "wetland", "prairie", "coral", "mangrove", "reserve", 
    "sanctuary", "fisheries", "gardening", "landscaping", "building", "biofuel", "hydropower", "hydroelectric", 
    "geothermal", "bio", "wave", "tidal", "electric", 
    "hybrid", "bicycle", "walking", "public", "carpool", "telecommuting", "videoconferencing", 
    "remote", "wfh", "reforestation", "afforestation", "protection", "forest", "wetland", 
    "prairie", "coral", "mangrove", "reserve", "sanctuary", "wildlife", "ecosystem", "habitat", 
    "permaculture", "aquatic", "terrestrial", "floral", "fauna", "flora", "plant", "animal", 
    "water", "air", "earth", "environment", "climate", "energy", "fuel", "waste", "pollution", 
    "carbon", "emission", "recycling", "composting", "decomposing", "preservation", "non-toxic", 
    "zero-waste", "low-impact", "low-energy", "low-emission", "low-carbon", "efficient", 
    "durability", "long-lasting", "quality", "innovative", "resourceful", "responsible", 
    "conscious", "awareness", "education", "advocacy", "activism", "stewardship", "symbiotic", 
    "balance", "harmony", "synergy", "integrity", "holistic", "wholesome", "health", "wellness", 
    "vitality", "purity", "fresh", "raw", "whole", "nutrient", "nourish", "harvest", "cultivate", 
    "grow", "produce", "yield", "sow", "reap", "sun", "light", "heat", "water", "rain", "soil", 
    "land", "earth", "nature", "outdoor", "wild", "free", "life", "living", "alive", "grow", 
    "evolve", "adapt", "flourish", "thrive", "prosper", "blossom", "bloom", "regenerate", 
    "rejuvenate", "renew", "restore", "revitalize", "refresh", "revive", "recover", "heal", 
    "gluten free", "gmo", "fair-trade", "healthy", "life", "oxygen", "vitamin", "vitamins",
    "nutrient", "nutrients", "health", "wellness", "wellbeing", "BPA-free","Stainless","steel","breathe"
}
def calculate_normalized_good_score_and_list_materials(
    text: str, 
    good_materials_count_threshold: int = 5,
):
    words = re.findall(r'\b\w+\b', text.lower())
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    processed_words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    materials = set()
    
    for word in processed_words:
        if word in bio_friendly_materials_set:
            materials.add(word)            
    
    if len(materials) >= good_materials_count_threshold:
        normalized_score = 1.0
    else:
        normalized_score = len(materials) / max(1, good_materials_count_threshold) 
    
    return normalized_score, materials