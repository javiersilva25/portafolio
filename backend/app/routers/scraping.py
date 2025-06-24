from fastapi import APIRouter
import requests
from bs4 import BeautifulSoup

router = APIRouter()

@router.get("/api/ejercicios-simplyfitness")
def obtener_ejercicios_simplyfitness():
    url_base = "https://www.simplyfitness.com"
    url = f"{url_base}/es/pages/workout-exercise-guides"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " \
                      "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "No se pudo obtener la página principal"}

    soup = BeautifulSoup(response.text, "html.parser")
    enlaces = soup.find_all('a', href=True)

    resultados = []
    nombres_excluidos = {
        "ejercicio", "ejercicios", "pectorales", "espalda", "piernas", "glúteos",
        "hombros", "bíceps", "tríceps", "core", "abdominales", "pantorrillas",
        "antebrazo", "fullbody"
    }

    vistos = set()

    for a in enlaces:
        nombre = a.get_text(strip=True).lower()
        href = a['href']

        if (
            href.startswith("/es/pages/") and
            nombre not in nombres_excluidos and
            len(nombre) > 3 and
            href not in vistos
        ):
            vistos.add(href)
            resultados.append({
                "nombre": a.get_text(strip=True),
                "url": f"{url_base}{href}"
            })

    return resultados or {"error": "No se encontraron ejercicios válidos"}
