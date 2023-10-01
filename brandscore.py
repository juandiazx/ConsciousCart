first = """
Reliance Trends
Costco
Tommy Bahama
Saks Fifth Avenue
Foot Locker
Famous Footwear
Tod
Li-Ning
Hudson’s Bay
LL Bean
Gerry Weber
Merrell
AJIO
Carhartt
Truworths
Triumph
Takko
Sports Direct
DSW
Beanpole
Bloomingdale
Macy
SHEIN
Skechers
Kmart
Billabong
Quiksilver
Roxy
Ross Dress for Less
Express
Furla
Eddie Bauer
CAROLL
Buckle
Shimamura
LC Waikiki
Dillard
Aeropostale
Romwe
Longchamp
Pepe Jeans
Deichmann
Jockey
Dolce & Gabbana
REVOLVE
Fabletics
BCBGMAXAZRIA
Reebok
Max
celio
DKNY
Nine West
Tory Burch
Splash
Fashion Nova
Max Mara
New Yorker
Tom Ford
ANTA
Bosideng
Heilan Home
Belle
Big Bazaar
Semir
Van Heusen
K-Way
KOOVS
Metersbonwe
Mexx
Savage
Fenty
Youngor
"""
first = [brand.strip() for brand in first.splitlines() if brand.strip()]
first = set(first)
second = """
Reserved
Otto
Diesel
Victoria’s Secret
Pimkie
Foschini
Mizuno
Joe Fresh
Fanatics
Jil Sander
Monoprix
Valentino
The Warehouse
Clarks
Marni
The Children’s Place
Kohl’s
KiK
United Arrows
Kiabi
Fossil
Carolina Herrera
Canada Goose
Fila
Burlington
ALDO
Brunello Cucinelli
Chico’s
TOPVALU COLLECTION
TJ Maxx
Anthropologie
Free People
Urban Outfitters
Steve Madden
La Redoute
Lands’ End
Kaufland
Ito-Yokado
MRP
Falabella
Chanel"""
second = [brand.strip() for brand in second.splitlines() if brand.strip()]
second = set(second)
third = """
Helly Hansen
CELINE
JD Sports
Matalan
Woolworths South Africa
Dior
Kathmandu
Louis Vuitton
Morrisons
Marc Jacobs
Muji
Asda
Hermès
Under Armour
Dick’s Sporting Goods
Very
Gymshark
Moncler
Nordstrom
Decathlon
Ted Baker
Amazon
Lidl
Paris
Desigual
Jack Wolfskin
Carter’s
boohoo
PrettyLittleThing
Salvatore Ferragamo
El Corte Inglés
HEMA
Carrefour
Versace
Michael Kors
Walmart
Prisma
Disney
Cotton On
Aritzia
Sandro
REI
American Eagle
Cortefiel
"""
third = [brand.strip() for brand in third.splitlines() if brand.strip()]
third = set(third)
fourth = """
Fjällräven
Zalando
Patagonia
Primark
Big W
Armani
Burberry
Marks & Spencer
Champion
Lacoste
Hanes
Bonprix
Target
Columbia Sportswear
Next
Brooks Sport
Dr. Martens
Mammut
ALDI SOUTH
Miu Miu
Prada
Fruit of the Loom
Russell Athletic
Abercrombie & Fitch
Hollister Co.
Bally
Wrangler
Ermenegildo Zegna
John Lewis
River Island
ALDI Nord
GUESS
"""
fourth = [brand.strip() for brand in fourth.splitlines() if brand.strip()]
fourth = set(fourth)
fifth = """
Tom Tailor
ASOS
Converse
Jordan
Nike
Bershka
Massimo Dutti
Pull&Bear
Stradivarius
Zara
Tommy Hilfiger
G-Star RAW
Mango
Superdry
Banana Republic
Gap
Old Navy
Calvin Klein
Tesco
Speedo
New Balance
ASICS
Esprit
Lindex
Chloé
Tchibo
s.Oliver
New Look
COACH
Jack & Jones
Vero Moda
Kate Spade"""
fifth = [brand.strip() for brand in fifth.splitlines() if brand.strip()]
fifth = set(fifth)
sixth = """
Levi Strauss & Co
Fendi
UGG
Adidas
Hugo Boss
Ralph Lauren
Zeeman
Gildan
Lululemon
Sainsbury’s
Balenciaga
Bottega Veneta
SAINT LAURENT
GU
Uniqlo"""
sixth = [brand.strip() for brand in sixth.splitlines() if brand.strip()]
sixth = set(sixth)
seventh = """
C&A
Puma
The North Face
Timberland
Vans
Dressmann
Calzedonia
Intimissimi
Tezenis"""
seventh = [brand.strip() for brand in seventh.splitlines() if brand.strip()]
seventh = set(seventh)
eighth = """
Gucci
Kmart Australia
Target Australia
United Colors of Benetton
H&M"""
eighth = [brand.strip() for brand in eighth.splitlines() if brand.strip()]
eighth = set(eighth)
ninth = "OVS"
ninth = set(ninth)
def brand_score(brandName):
    if brandName in first:
        return "Extremely Ethically Questionable"
    if brandName in second:
        return "Very Ethically Questionable"
    if brandName in third:
        return "Ethically Questionable"
    if brandName in fourth:
        return "Somewhat Ethically Questionable"
    if brandName in fifth:
        return "Ethically Neutral"
    if brandName in sixth:
        return "Somewhat Ethically Friendly"
    if brandName in seventh:
        return "Ethically Friendly"
    if brandName in eighth:
        return "Very Ethically Friendly"
    if brandName in ninth:
        return "Extremely Ethically Friendly"