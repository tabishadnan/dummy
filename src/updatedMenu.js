const arr = [
    {
        "group": "Application Resource",
        "url": "/coupons",
        "newOrder": 4,
        "newTitle": "Manage Coupons"
    },
    {
        "group": "Application Resource",
        "url": "/bannersandmenus",
        "newOrder": 5,
        "newTitle": "Banners & Menus"
    },
    {
        "group": "Application Resource",
        "url": "/search/mutewords",
        "newOrder": 6,
        "newTitle": "Website Search"
    },
    {
        "group": "Application Resource",
        "url": "/clients/list",
        "newOrder": 7,
        "newTitle": "Manage Clients"
    },
    {
        "group": "Application Resource",
        "url": "/dealers/list",
        "newOrder": 7,
        "newTitle": "Manage Dealers"
    },
    {
        "group": "Application Resource",
        "url": "/distributors",
        "newOrder": 8,
        "newTitle": "Manage Distributors"
    },
    {
        "group": "Application Resource",
        "url": "/contenttemplates",
        "newOrder": 9,
        "newTitle": "Content Templates"
    },
    {
        "group": "Application Resource",
        "url": "/surveys/list",
        "newOrder": 10,
        "newTitle": "Manage Surveys"
    },
    {
        "group": "Application Resource",
        "url": "/productreviews/list",
        "newOrder": 11,
        "newTitle": "Product Reviews"
    },
    {
        "group": "Application Resource",
        "url": "/browsinghistory/list",
        "newOrder": 12,
        "newTitle": "Browsing History"
    },
    {
        "group": "Application Resource",
        "url": "/communicationhistory/list",
        "newOrder": 13,
        "newTitle": "Communication History"
    },
];


arr.forEach((it) => {

    print(it.newOrder)

    db.applicationResources.update(
        {
            "navGroup.group": it.group,
            "navGroup.url": it.url,
        },
        {
            $set: {
                "navGroup.title": it.newTitle,
                "navGroup.displayOrder": it.newOrder,
            }
        },
        { multi: true }
    )

});



// ==========================


const arr = [
    {
        "group": "Application Setting",
        "url": "/users",
        "newOrder": 0,
        "newTitle": "Manage System Users"
    },
    {
        "group": "Application Setting",
        "url": "/roles",
        "newOrder": 1,
        "newTitle": "Manage Roles"
    },
    {
        "group": "Application Setting",
        "url": "/faq",
        "newOrder": 2,
        "newTitle": "Manage FAQ"
    },
    {
        "group": "Application Setting",
        "url": "/urlinfo/list",
        "newOrder": 3,
        "newTitle": "Web Marketing"
    },
    {
        "group": "Application Setting",
        "url": "/staticpages",
        "newOrder": 4,
        "newTitle": "Manage Pages"
    },
    {
        "group": "Application Setting",
        "url": "/panels",
        "newOrder": 5,
        "newTitle": "Manager Pages Panels"
    },
    {
        "group": "Application Setting",
        "url": "/urlredirects/list",
        "newOrder": 6,
        "newTitle": "URL Redirects"
    },
    {
        "group": "Application Setting",
        "url": "/redirectlogs",
        "newOrder": 7,
        "newTitle": "Redirect Logs"
    },
    {
        "group": "Application Setting",
        "url": "/applicationvalues",
        "newOrder": 8,
        "newTitle": "Application List Values"
    },
    {
        "group": "Application Setting",
        "url": "/applicationconfigurations",
        "newOrder": 9,
        "newTitle": "Application Configurations"
    },
    {
        "group": "Application Setting",
        "url": "/configurations",
        "newOrder": 10,
        "newTitle": "Domain Setup"
    },
    {
        "group": "Application Setting",
        "url": "/accountinfo",
        "newOrder": 11,
        "newTitle": "Account Information"
    },
];


arr.forEach((it) => {

    print(it.newOrder)

    db.applicationResources.update(
        {
            "navGroup.group": it.group,
            "navGroup.url": it.url,
        },
        {
            $set: {
                "navGroup.title": it.newTitle,
                "navGroup.displayOrder": it.newOrder,
            }
        },
        { multi: true }
    )

});


