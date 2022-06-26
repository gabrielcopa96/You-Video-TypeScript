import { Application, Request, Response } from "express";
import CoursesData from "../../data/courses.json";
const axios = require("axios")
require('dotenv').config();
const APY_KEY = process.env.APY_KEY_YOUTUBE 

var promisResul:any;

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send(CoursesData);
  });
  
  app.get("/youtube", async (req: Request, res: Response) => {

    console.log('antes del pedido a la api desde el back')
    // console.log(req.query, 'las queries') // la búsqueda
    let { search } = req.query;
   

    if (promisResul) {
      return res.status(200).json(promisResul);
    }

    console.log('sale el pedido a la api desde el back')


    let youTubeApi = "https://youtube.googleapis.com/youtube/v3/search";
    let part = "snippet";
    let query = search;
   
    const options = {
      method: 'GET',
      url: youTubeApi,
      params: {
        part: part,
        q: query,
        key: APY_KEY
      },         
    };

    try {
      promisResul = await axios.request(options)
      .then(function (response: any) {
        // console.log(response.data);
        return response.data;
  
      }).catch(function (error: any) {
  
        console.error(error);
        return error.data;
      });
  
      return res.status(200).json(promisResul);
      
    } catch (error) {

      console.log(error);
      return res.send('Ocurrió un error');
    }

  });


};




