import client from "../../database/client-pool/herokuBDD";
import axios from 'axios';
import { Request, Response } from "express";

const coordinateController = {
  async getCoordinate(req: Request, res: Response) {
    try {
      const query = 'SELECT * FROM "Customer";';
      const customerList = await client.query(query);
      const customerArray = customerList.rows; 

      async function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      for (const item of customerArray) {
        if (item.lon !== null && item.lat !== null) {
          console.log(
            `Coordonnées valides pour ${item.name} - lon: ${item.lon}, lat: ${item.lat}`
          );
        } else {
          const addressComponents = [];
          if (item.maininvoicingaddress_address1) addressComponents.push(item.maininvoicingaddress_address1);
          if (item.maininvoicingaddress_address2) addressComponents.push(item.maininvoicingaddress_address2);
          if (item.maininvoicingaddress_address3) addressComponents.push(item.maininvoicingaddress_address3);
          if (item.maininvoicingaddress_zipcode) addressComponents.push(item.maininvoicingaddress_zipcode);
          if (item.maininvoicingaddress_city) addressComponents.push(item.maininvoicingaddress_city);
          if (item.maininvoicingaddress_state) addressComponents.push(item.maininvoicingaddress_state);

          const address = addressComponents.filter(Boolean).join(', ');

          console.log(
            `Coordonnées manquantes ou nulles pour ${item.name} - Adresse: ${address}`
          );

          if (address) {
            await delay(0);
            const success = await geocodeAddressAndSave(item, address);

            if (success) {
              console.log(`Coordonnées mises à jour pour ${item.name}`);
            } else {
              console.log(`Erreur lors de la mise à jour des coordonnées pour ${item.name}`);
            }
          } else {
            console.log(`Adresse incomplète pour ${item.name}`);
          }
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
  },
};

async function geocodeAddressAndSave(customer: { id: number | string }, address: string) {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: { format: "json", q: address }
    });

    if (response.data && response.data.length > 0) {
      const lat = parseFloat(response.data[0].lat);
      const lon = parseFloat(response.data[0].lon);

      await axios.post(`${process.env.url_main}/insertCoordinate`, {
        lon: lon,
        lat: lat,
        id: customer.id
      });
      
      return true;
    } else {
      await axios.post(`${process.env.url_main}/insertCoordinate`, { lon: 0, lat: 0, id: customer.id });
      return false;
    }
  } catch (error) {
    console.error('Erreur lors du géocodage de l\'adresse', error);
    return false;
  }
}

export default coordinateController;
