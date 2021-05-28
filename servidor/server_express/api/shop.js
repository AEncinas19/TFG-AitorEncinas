const {models} = require('../models');
const Sequelize = require('sequelize');
const fetch = require('node-fetch');
const stripe = require('stripe')('sk_test_51IkSMjAwYEmxhVRRc4vxO7huYjhxHLz8ZzjcIg4IVIopRZvwD40Wr3MCtYUbTWTlzVdBs5IGF6seunQG2NdvIt0Y0061l1REFW');

exports.findshop = async (req, res, next) => {

  sendPushMessages = async (message) => {
    try{
      let response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      let responsed = await response.json();
      console.log(responsed);
    }
    catch (error) {
      next(error);
    }
  }

  try {

      console.log(req.body.latitud)
      console.log(req.body.longitud)
      console.log(req.body.shopfind)
      const user = req.user;
      const shops = await models.Shop.findAll({
        include:[{ model: models.Product, as: 'placements'}]
      });

      const shop = shops.filter(shp => {
        if (Math.abs(shp.latitud - req.body.latitud) <= 0.001 && Math.abs(shp.longitud - req.body.longitud) <= 0.001){
          return shp;
        }
      });

      if (shop[0] && user && !req.body.shopfind) {
        shop[0].placements.forEach(item => {
          if (item.dataValues.isoffer){
            const message = {
                to: user.pushtoken,
                sound: 'default',
                title: '¡Ofertón! ¡No te lo puedes perder!',
                body: item.productname + ' ' + item.price.toString() + '€',
                channelId: 'default'
            };
            sendPushMessages(message);
          }
        })  
        res.status(200).send({shop: shop[0]});
      }
      else if (shop[0] && user && req.body.shopfind) {
        res.status(200).send({shop: 1});
      }
      else {
        res.status(200).send({shop: null});
      }
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.findBackgroundshop = async (req, res, next) => {

  sendPushMessages = async (message) => {
    try{
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

    }
    catch (error) {
      next(error);
    }
  }

  const user = req.user;
  console.log(req.data)
  console.log(req.body.latitud)
  console.log(req.body.longitud)
  const shops = await models.Shop.findAll({
    include:[{ model: models.Product, as: 'placements'}]
  });

  const shop = shops.filter(shp => {
    if (Math.abs(shp.latitud - req.body.latitud) <= 0.001 && Math.abs(shp.longitud - req.body.longitud) <= 0.001){
      return shp;
    }
  });

  if (shop[0] && user) {
    const message = {
        to: user.pushtoken,
        sound: 'default',
        title: '¡Se han encontrado ofertas para ti en ' + shop[0].name + '!',
        body: 'Pulsa y accede a la aplicación para verlas',
        channelId: 'default'
    };
    sendPushMessages(message);
    res.status(200).send(JSON.stringify({finish: true}));
  }
  else {res.status(200).send(JSON.stringify({finish:false}))}
}

exports.makePayment = async (req, res, next) => {
  const total = req.body.total;
  const token = req.body.token;

  try{
    let charge = await stripe.charges.create({
      amount: total,
      currency: "EUR",
      source: token
    })

    if (charge){
      console.log(charge)
      res.status(200).send(JSON.stringify({charge: charge}))
    }
    else{
      res.sendStatus(500);
    }
  } catch (error){
    console.log(error)
  }
}

exports.getShopsPosition = async (req, res, next) => {

  try {
      const shops = await models.Shop.findAll()
      console.log(shops)
      res.status(200)
      .send({shops: shops})

  } catch (error) {
      next(error);
  } 
};
