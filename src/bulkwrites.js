db.users.find({
    "_id" : ObjectId("6179c205c2f6750015d76c23"),
});

db.users.bulkWrite([
    // If match update
  { "updateOne": {
    "filter": { 
      "_id" : ObjectId("6179c205c2f6750015d76c23"),
      "mediaDetail": { 
        "$elemMatch": { "name": "helloWorld" }
      }
    },
    "update": { 
        "$set": { "mediaDetail.$": { "name" : "helloWorld", "title" : "Hello World", "displayOrder" : 21} }
      }
  }},
  // If not match insert
  { "updateOne": {
    "filter": {
      "_id" : ObjectId("6179c205c2f6750015d76c23"),
      "mediaDetail": {
        "$not": {
            "$elemMatch": { "name": "helloWorld" }
        }
      }
    },
    "update": {
      "$push": { "mediaDetail": { "name" : "helloWorld", "title" : "Hello World", "displayOrder" : 22 } }
    }
  }},
])