const arr = [
    { "title": "A", "navGroup.displayOrder": 0, "newOrder": 2 },
    { "title": "B", "navGroup.displayOrder": 1, "newOrder": 0 },
    { "title": "C", "navGroup.displayOrder": 2, "newOrder": 1 }
];


arr.forEach((it) => {

    print(it.newOrder)

    db.users.update(
        {
            title : it.title,
            "navGroup.displayOrder" : it["navGroup.displayOrder"]
        },
        {
            $set: {
                "navGroup": {
                    "displayOrder": it.newOrder,
                }
            }
        },
        { multi: true, upsert: false }
    )

});

const arr = [
    { "title": "Client", "navGroup.group": "Application Resources", "navGroup.displayOrder": 4, "newOrder": 14 },
    { "title": "Manage Coupons", "navGroup.group": "Application Resources", "navGroup.displayOrder": 8, "newOrder": 4 },
];

arr.forEach((it) => {

    print(it.newOrder)

    db.users.update(
        {
            title: it.title,
            "navGroup.displayOrder": it["navGroup.displayOrder"]
        },
        {
            $set: {
                "navGroup": {
                    "displayOrder": it.newOrder,
                }
            }
        },
        { multi: true, upsert: false }
    )

});