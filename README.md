# Mutant API

Este proyecto es una API para la detección de mutantes en ADN, basada en el reto técnico propuesto. La API recibe una secuencia de ADN y determina si el individuo es mutante o no, basándose en patrones genéticos predefinidos.

## Descripción

El objetivo de esta API es identificar si una persona es mutante a partir de su secuencia de ADN, comparando la secuencia dada con una serie de patrones específicos. Un mutante se define como alguien que tiene al menos dos secuencias de 4 bases consecutivas en diagonal, horizontal o vertical que se repiten en su ADN.

## Tecnologías

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para la creación de la API.
- **Jest**: Framework de testing para pruebas unitarias.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/mutant-api.git
2. Navega al directorio del proyecto:
   ```bash
   cd mutant-api
3. Instala las dependencias:
```bash
   npm install
```

## Uso

Para ejecutar la API localmente en tu máquina, usa el siguiente comando:

```bash
npm start
```

La API estará disponible en `http://localhost:3000`.

### Endpoints disponibles

#### `POST /mutant`

Este endpoint recibe una secuencia de ADN en formato JSON y devuelve un estado indicando si el ADN corresponde a un mutante o no.

**Request body**:

```json
{
  "dna": [
    "ATGCGA",
    "CAGTGC",
    "TTATGT",
    "AGAAGG",
    "CCCCTA",
    "TCACTG"
  ]
}
```

**Response**:

- Si el ADN corresponde a un mutante:
  ```json
  {
    "isMutant": true
  }
  ```
- Si el ADN no corresponde a un mutante:
  ```json
  {
    "isMutant": false
  }
  ```

#### `GET /stats`

Este endpoint devuelve las estadísticas de la base de datos, incluyendo el número de ADN analizados y el porcentaje de mutantes.

**Response**:

```json
{
  "count_mutant_dna": 2,
  "count_human_dna": 5,
  "ratio": 0.4
}
```

## Pruebas

Puedes ejecutar las pruebas unitarias con el siguiente comando:

```bash
npm test
```
