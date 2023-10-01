import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

nltk.download('wordnet')
nltk.download('punkt')
nltk.download('stopwords')

excluded_materials = {
    "acetaldehyde", "acheson", "acid", "aflatoxins", "alcoholic", 
    "aminobiphenyl", "areca", "aristolochic", 
    "arsenic", "asbestos", "auramine", "azathioprine", "benzene", 
    "benzidine", "benzopyrene", "beryllium", "betelquid", "chloromethylether", 
    "busulfan", "butadiene", "cadmium", "chlorambucil", "chlornaphazine", 
    "chromiumvi", "clonorchis", "sinensis", "emissions", "gasification", 
    "tar", "coal", "cyclophosphamide", "cyclosporine", "dichloropropane", 
    "diethylstilbestrol", "exhaust", "diesel", 
    "barr", "erionite", "estrogen", 
    "progestogen", "ethanol", "ethylene oxide", "etoposide", 
    "etoposide", "cisplatin", "bleomycin", "firefighter", 
    "fission", "fluoro", "edenite", "fibrous", "amphibole", "formaldehyde", 
    "haematite", "helicobacter", "pylori", "hepatitis", "papilloma", 
    "ymphotropic", "ionizing", "radiation", "isopropyl", 
    "leather dust", "lindane", "melphalan", "methoxsalen", 
    "methyl", "methylenebis", "chloroaniline", "mopp", 
    "naphthylamine", "nickel", "nitrosonornicotine", 
    "opisthorchis", "viverrini", "opium", "pentachlorobiphenyl", "pentachlorodibenzofuran", "pentachlorophenol", 
    "phenacetin", "phosphorus32", "plutonium", "polychlorinated" ,"biphenyls", 
    "radioiodines", "radionuclides", "radium", "rubber", "schistosoma", "haematobium", 
    "semustine", "shale", "silica",  "soot", "sulfur", "talc", "asbestiform", "tamoxifen", 
    "tetrachlorodibenzo", "thiotepa", "thorium", "tobacco", "ortho", "toluidine", "treosulfan", 
    "trichloroethylene", "uvradiation", "tanning", 
    "chloride", "fumes", "woodchip", "bleach", "insecticisde", "pesticide", "kill", "killer",
    "killing", "damage", "damaging", "poison", "poisonous", "poisoning", "harm", "harmful", "harmfulness","cellophane","BPA",
    "epoxy","aluminum","teflon","perfumes","shampoo","deodorant","cookies","frozen","cereal","soda","alcohol","cleaning","acid","cookie","snack",
    "sugar"
}
def calculate_normalized_harmfulness_score_and_list_materials(
    text: str, 
    harmful_materials_count_threshold: int = 5,
):
    words = re.findall(r'\b\w+\b', text.lower())
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    processed_words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]

    allchemicals = set()

    for word in processed_words:
        if word in excluded_materials:
            allchemicals.add(word)            
    
    if len(allchemicals) >= harmful_materials_count_threshold:
        normalized_score = 1.0
    else:
        normalized_score = len(allchemicals) / max(1, harmful_materials_count_threshold) 
    
    return normalized_score, allchemicals
