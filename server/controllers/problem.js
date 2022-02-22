
const Gericht = require('../models/gericht-model')
const fs = require('fs')

getThingbyName = function (thingName) {
    return Thing.findOne({name: thingName}).exec();
}

savePlan = async (req, res) => {
    const plan = req.body;
    let myList = {};
    let promises = [];

    for (var i = 0; i < plan.length; i++)
    plan.forEach(function(plan){
            promises.push(
            getThingbyName(plan.thingName).then(
                (res) => {
                    const elements = res.elements;
                    elements.forEach(function(element){
                        if (element in myList){
                            return myList[element] += 1;
                        }
                        else {
                            return myList[element] = 1;
                        }
                    })
                }
            ).catch ((error) => {
                console.log(error);
            })
        );
    });
    console.log(promises)
    Promise.all(promises).then(() => console.log(myList));

}


