
sumFromGetRequest = function (req) {
    console.log(`typeof get req ${typeof req.query}`)
    // let a = parseInt(req.query.a);
    // let b = parseInt(req.query.b);	
    return sum();
}

sumFromPostRequest = function (req) {
    // let values = req.body.values;
    // values = JSON.parse(values);
    // let total = 0;
    // values.forEach(element => {
    // 	total = total + element;
    // });
    // res.json(total);
    return sum();
}

sum = function (values) {
    let total = NaN;
    if (values === 'number') {
        total = values;
    } else if (Array.isArray(values)) {
        values.forEach(value => {
            total += value;
        });
    } else {
        console.log('Fail to sum the values, parameter is undefined or incompatible type');
    }
    return total;
}

module.exports = {
    sumFromGetRequest: sumFromGetRequest,
    sumFromPostRequest: sumFromPostRequest
}