db.Movies.find()

db.Movies.countDocuments({})

db.Movies.count()

db.Movies.find({title: "Interestellar"})

db.Movies.insertOne({
    title: "Interestellar"
    year: 2014,
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    genres: ["Science Fiction", "Drama"]
})

db.Movies.deleteOne({ title: "Interestellar"})

db.Movies.count({cast: "and"})

db.Movies.updateMany(
    { cast: "and"},
    { $pull: { cast: "and"} }
    )
    
db.Movies.countDocuments({ cast: { $size: 0 } })    
    
db.Movies.find({ cast:[]}).count()

db.Movies.updateMany(
    { cast: [] },
    {$push: { cast: "Undefined"}}
    )

db.Movies.find({ genres:[]}).count()

db.Movies.updateMany(
    { genres: [] },
    {$push: { genres: "Undefined"}}
    )



var fase1 = { $match: { year: { $gte: 1999, $lte: 2018 } } }
var fase2 = { $group: { _id: null, total: { $sum: 1 } } }

db.Movies.aggregate([fase1, fase2])


var fase1 = { $match: { year: { $gte: 1960, $lte: 1969 } } }
var fase2 = { $group: { _id: null, total: { $sum: 1 } } }

db.Movies.aggregate([fase1, fase2])


var fase1 = {$group: {_id: "$year", pelis: { $sum:1 } } }
var fase2 = {$sort: {pelis: -1 } }
var fase3 = {$limit: 1 }

db.Movies.aggregate([fase1, fase2, fase3])


var fase1 = {$group: {_id: "$year", pelis: { $sum:1 } } }
var fase2 = {$sort: {pelis: 1 } }
var fase3 = {$limit: 3 }

db.Movies.aggregate([fase1, fase2, fase3])


var fase1= { $unwind: "$cast"}
var fase2= { $out: "actors"}
db.Movies.aggregate([fase1, fase2])



var fase1 = { $unwind: "$cast" }
var fase2 = { $project: { _id: 0, title: 1, year: 1, cast: 1, genres: 1 } }
var fase3 = { $out: "actors" }

db.Movies.aggregate([fase1, fase2, fase3])
db.actors.find()

db.actors.find({}, { _id: 0 })

db.actors.count()



db.actors.find({},{ _id: 0, cast: 1, title: 1, year: 1 }).sort({ cast: 1, year: 1, title: 1 })



var fase1 = { $group: {_id: {title: "$title", year: "$year"}, cuenta: {$sum: 1}}}
var fase2 = { $sort: { cuenta: -1 } }
var fase3 = { $limit: 5 }

db.actors.aggregate([fase1, fase2, fase3])

db.actors.find({title: "Avengers: Infinity War"}, {_id:0, cast:1})




var fase1 = {$match: { cast: { $ne: "Undefined" } } } 
var fase2 = {$group: {_id: "$cast", comienza: { $min: "$year"}, termina: { $max: "$year"} } }
var fase3 = {$project: {_id: 1, comienza: 1, termina: 1, years: { $subtract: ["$termina", "$comienza"]}}}
var fase4 = { $sort: { years: -1 } }
var fase5 = { $limit: 5 }

db.actors.aggregate([fase1, fase2, fase3, fase4, fase5])

db.actors.find(
  { cast: "Harrison Ford" },
  { _id: 0, title: 1, year: 1 }
).sort({ year: 1 })


var fase1 = { $unwind: "$genres" }
var fase2 = { $project: { _id: 0, title: 1, year: 1, cast: 1, genres: 1 } }
var fase3 = { $out: "genres" }

db.actors.aggregate([fase1, fase2, fase3])

db.genres.find({}, { _id: 0 })

db.genres.count()



var fase1 = { $match: { genres: { $ne: "Undefined" } } }
var fase2 = {$group: {_id: { genre: "$genres", year: "$year" }, titulos: { $addToSet: "$title" }}}
var fase3 = { $project: { _id: 1, cuenta: { $size: "$titulos" } } }
var fase4 = { $sort: { cuenta: -1 } }
var fase5 = { $limit: 5 }

db.genres.aggregate([fase1, fase2, fase3, fase4, fase5])


var fase1 = { $match: { cast: { $ne: "Undefined" }, genres: { $ne: "Undefined" } } }
var fase2 = { $group: {_id: "$cast", generos: { $addToSet: "$genres" }}}
var fase3 = { $project: {_id: 1, numgeneros: { $size: "$generos" }, generos: 1}}
var fase4 = { $sort: { numgeneros: -1 } }
var fase5 = { $limit: 5 }

db.genres.aggregate([fase1, fase2, fase3, fase4, fase5])


var fase1 = { $match: { genres: { $ne: "Undefined" } } }
var fase2 = {$group: {_id: { title: "$title", year: "$year" },generos: { $addToSet: "$genres" } } }
var fase3 = {$project: {_id: 1, generos: 1, numgeneros: { $size: "$generos" } } }
var fase4 = { $sort: { numgeneros: -1 } }
var fase5 = { $limit: 5 }

db.genres.aggregate([fase1, fase2, fase3, fase4, fase5])



var fase1= {$match:{genres:{$ne:"Undefined"}}}
var fase2= {$addFields:{decada:{$subtract:["$year",{$mod:["$year",10]}]}}}
var fase3= {$group:{_id:{decada:"$decada",genre:"$genres"},pelis:{$addToSet:{title:"$title",year:"$year"}}}}
var fase4= {$project:{_id:1,cuenta:{$size:"$pelis"}}}
var fase5= {$sort:{"_id.decada":1,cuenta:-1}}
var fase6= {$group:{_id:"$_id.decada",top:{$first:"$$ROOT"}}}
var fase7= {$project:{_id:0,decada:"$_id",genero_top:"$top._id.genre",num_peliculas:"$top.cuenta"}}
var fase8= {$sort:{decada:-1}}


db.genres.aggregate([fase1,fase2,fase3,fase4,fase5,fase6,fase7, fase8])


var fase1={$match:{genres:{$ne:"Undefined"}}}
var fase2={$group:{_id:{genre:"$genres",year:"$year"},titulos:{$addToSet:"$title"}}}
var fase3={$project:{_id:1,cuenta:{$size:"$titulos"}}}
var fase4={$match:{cuenta:{$gte:20}}}
var fase5={$sort:{cuenta:1}}
var fase6={$limit:5}
db.genres.aggregate([fase1,fase2,fase3,fase4,fase5,fase6])

var fase1 = { $match: { cast: { $ne: "Undefined" } } }   
var fase2 = { $group: { _id: "$cast", cuenta: { $sum: 1 } } }
var fase3 = { $sort: { cuenta: -1 } }
var fase4 = { $limit: 5 }

db.actors.aggregate([fase1, fase2, fase3, fase4])


db.actors.find({ cast: /robert/i },{ _id:0, cast:1 })


db.genres.aggregate([
  {$match:{genres:{$ne:"Undefined"},"cast.name":"Robert Downey, Jr."}},
  {$group:{_id:null,pelis:{$addToSet:"$title"}}},
  {$project:{_id:0,actor:"Robert Downey, Jr.",num_peliculas:{$size:"$pelis"}}}
])


var fase1={$match:{"cast": "Robert Downey, Jr."}}
var fase2={$group:{_id:"$cast",pelis:{$addToSet:{title:"$title",year:"$year"}}}}
var fase3={$project:{_id:0,actor:"$_id",num_peliculas:{$size:"$pelis"}}}

db.actors.aggregate([fase1,fase2,fase3])

var fase1={$match:{cast:"Robert Downey, Jr.",genres:{$ne:"Undefined"}}}
var fase2={$group:{_id:"$genres",pelis:{$addToSet:{title:"$title",year:"$year"}}}}
var fase3={$project:{_id:0,genero:"$_id",num_peliculas:{$size:"$pelis"}}}
var fase4={$sort:{num_peliculas:-1}}
var fase5={$limit:5}

db.genres.aggregate([fase1,fase2,fase3,fase4,fase5])

db.genres.distinct()