db.users.aggregate(
    // Initial document match (uses index, if a suitable one is available)
    { $match: {
        "_id" : ObjectId("6179bbb0c2f6750015d76c21"),
    }},

    // Expand the scores array into a stream of documents
    { $unwind: '$mediaDetail' },
    
    {$project: {'mediaDetail':1}},
    
    // Sort in descending order
    { $sort: {
        'mediaDetail.displayOrder': 1
    }}
)