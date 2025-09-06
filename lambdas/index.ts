import dotenv from 'dotenv';
import * as mint from './src/handlers/mint';
import * as search from  './src/handlers/search'

const obj = {
  "id": "12",
  "name": "Teste eventos Blockchain",
  "animal": {
    "id": "1747249186566x744138392279711700",
    "name": "Teste eventos Blockchain",
    "date_of_birth": "2025-05-12T03:00:00.000Z"
  },
  "events": [
    {
      "type_number": 0,
      "description": "Nascimento do animal\nNome do pai: Trovão\nNome da mãe: Mimosa\nLocal do nascimento: Fazenda Aracoara\nObservações do nascimento: Parto normal",
      "date": "2025-05-14T18:59:46.477Z",
      "location": {
        "id": "10",
        "name": "Fazenda Aracoara",
        "latitude": -20.7971327,
        "longitude": -20.7971327
      }
    },
    {
      "type_number": 1,
      "description": "Aplicação da vacina Raiva",
      "date": "2025-05-14T03:00:00.000Z",
      "location": {
        "id": "10",
        "name": "Fazenda Aracoara",
        "latitude": -20.7971327,
        "longitude": -20.7971327
      }
    },
    {
      "type_number": 3,
      "description": "Novo peso registrado: 80 KG",
      "date": "2025-05-13T03:00:00.000Z",
      "location": {
        "id": "10",
        "name": "Fazenda Aracoara",
        "latitude": -20.7971327,
        "longitude": -20.7971327
      }
    },
    {
      "type_number": 3,
      "description": "Novo peso registrado: 85 KG",
      "date": "2025-05-14T03:00:00.000Z",
      "location": {
        "id": "10",
        "name": "Fazenda Aracoara",
        "latitude": -20.7971327,
        "longitude": -20.7971327
      }
    },
    {
      "type_number": 1,
      "description": "Aplicação da vacina Clostriodiose",
      "date": "2025-05-13T03:00:00.000Z",
      "location": {
        "id": "10",
        "name": "Fazenda Aracoara",
        "latitude": -20.7971327,
        "longitude": -20.7971327
      }
    },
    {
      "type_number": 4,
      "description": "Morte do animal\n\nCausa: Raio\nData da morte: 14/05/2025",
      "date": "2025-05-14T03:00:00.000Z",
      "location": {
        "id": "10",
        "name": "Fazenda Aracoara",
        "latitude": -20.7971327,
        "longitude": -20.7971327
      }
    }
  ]
};

(async function run() {
  dotenv.config({ path: '../.env' });
  //const lambda = await mint.handler({ queryStringParameters: { dryrun: 'false' }, ...obj }) as any;

  const lambda = await search.handler({ queryStringParameters: { id: '12' } });
  console.log(lambda)
})()