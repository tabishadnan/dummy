// db.products.find({}).forEach(function(document) {
//     db.users.update(
//         { "longName": document.longName }, 
//         { "$set": { "productName": document.longName } }
//     );
// })



db.domainConfigration.find({}).forEach((x) => {

    print(x.appId);

    db.products.find({
        "businessId" : ObjectId(x.appId),
    }).forEach( (document) => {
        db.productVariants.update(
            {   
                "businessId" : ObjectId(x.appId),
                "longName": {"$ne": ["", null]}
            },
            { "$set": { "productName": document.longName } }
        );
    })

})