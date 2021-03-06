const express = require ('express');
require('./dbconection');
const Restaurant = require('./restaurant');
const User = require('./userModel');
const uuid = require('uuid')


const app = express ();
app.use(express.json())
//Pesquisa todos restaurantes funcionando
app.get('/restaurants', async(req,res)=>{
    // token 1
    // const token = req.query.token
    // if (token != 'lasanha'){
    //     res.status(401).json({message: 'Acesso negado: token inválido'});
    //     return;
    // }

    //token 2
    // const token = req.header('token')
    // if (token != 'lasanha'){
    //     res.status(401).json({message: 'Acesso negado: token inválido'});
    //     return;
    // }

    const restaurants = await Restaurant.find();
    res
    .status(200)
    .json(restaurants);


})
//Pesquisa por Bairro funcionando
app.get('/restaurants/borough/:borough',async(req,res) =>{
   
    const borough = req.params.borough;
  var restaurant = await Restaurant.find({borough:borough})
  if(restaurant.length < 1){
      res.status(404).json({message: 'Bairro não encostrado'})
      console.log('Rota do bairro')
  }
  res.status(200).json(restaurant)
  

})
//Pesquisa por nome funcionando
app.get('/restaurants/name/:name',async(req,res) =>{
    const name = req.params.name;
  var restaurant = await Restaurant.find({name:name})
  if(restaurant.length < 1){
      res.status(404).json({message: 'Restaurante não encostrado'})
  }
  res.status(200).json(restaurant)
  

})

// Adicionar restaurantes ta funcionando
app.post('/restaurant', (req, res) => {
  
    var restaurant = new Restaurant(req.body)
    restaurant.save()
    res
    .status(200)
    .json(restaurant);
})
//Delete pelo nome
app.delete('/restaurants/:nome', async(request, response) => {
    var nome = request.params.nome;

   
    response.status(200).json(await Restaurant.deleteOne({name:nome}))
})


// app.put('/restaurants/:name', (req, res) => {
//     var name = req.params.name;
//     // var newName = req.body.name;

//     var index = restaurants.findIndex((restaurant) => restaurant.name == name);

//     if(index == -1) {
//        response.status(404).json({erro: 'esse recurso não existe'}) 
//     }else {
//         restaurants[index].name = newName;
//         response.status(200).json({message: 'Tudo certo', restaurants: restaurants})
//     }


// })

app.post('/signup',async(req,res)=> {
    const email = req.body.email;
    const user = await User.findOne({email:email});
    console.log(user)
    if (user){
        res.status(200).json({message:'Usuário já existente :',token: user.token})
        return;
    }
    const token = uuid.v4()
    const newUser = new User({
        email : email,
        token : token,

    });

    newUser.save()
    .then(()=>{
        res.status(201).json({message:'Token gerado :',token: token})
    })
    .catch((error)=>{
        res.status(400).json({message: error.message});

    })
})

app.listen(3000,()=> {
    console.log('Server online')
});

