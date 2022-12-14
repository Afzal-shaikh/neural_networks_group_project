const axios = require('axios');
const API_BASE_URL = 'http://127.0.0.1:12345'

function predict(data){  
    let dataset = {
        "First Term Gpa" : data.First_Term_Gpa,
        "Second Term Gpa" : data.Second_Term_Gpa, 
        "First Language" : data.First_Language,
        "Funding numeric" : data.Funding,
        "School numeric" : data.School,
        "FastTrack numeric" : data.FastTrack,
        "Coop numeric" : data.Coop,
        "Residency numeric" : data.Residency,
        "Gender numeric" : data.Gender,
        "Previous Education" : data.Previous_Education,
        "Age Group" : data.Age_Group,
        "High School Average Mark" : data.High_School_Average_Mark,
        "Math Score" : data.Math_Score,
        "English Grade" : data.English_Grade
    }
    let testSet = []

    dataset = Object.entries(dataset).reduce(
            (obj, [key, value]) => (obj[key] = parseFloat(value), obj), 
            {}
        )

    testSet.push(dataset)

    return new Promise((resolve, reject) =>
    axios
        .post(API_BASE_URL+'/predict',testSet)
        .then((response) => {
            if (response.data)
            resolve(response.data)
        })
        .catch((error) => {
            if (error.response) {
                console.log("status..", error.response.status);
            }
            reject(false);
        })
    )
}

export {
    predict
}

