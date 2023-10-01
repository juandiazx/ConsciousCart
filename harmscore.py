import re

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
    "chloride", "fumes", "woodchip"
}
def calculate_normalized_harmfulness_score_and_list_materials(
    text: str, 
    harmful_materials_count_threshold: int = 5,
):
    words = re.findall(r'\b\w+\b', text.lower())
    allchemicals = set()
    for word in words:
        if word in excluded_materials:
            allchemicals.add(word)            
    
    if len(allchemicals) >= harmful_materials_count_threshold:
        normalized_score = 1.0
    else:
        normalized_score = len(allchemicals) / max(1, harmful_materials_count_threshold) 
    
    return normalized_score, allchemicals
