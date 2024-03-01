const axios = require('axios');

const { QUIZ_API_KEY } = process.env;

class QuizApi {
    async autoryzation() {
        return axios.get("https://quizapi.io/api/v1/questions", {
            params: {
                apiKey: QUIZ_API_KEY
            }
          }).then((response)=> {
          if (response.status >= 400) {
              console.log(response.status);
              throw new Error("Bad response from server");
          } else{
                return response.data;
          }
            }).then((data)=>{
                console.log(data);
            })
    }

    async getQuestions(limit='1', category=undefined, level=undefined) {
        return axios.get("https://quizapi.io/api/v1/questions", {
            params: {
                apiKey: QUIZ_API_KEY,
                limit,
                category,
                difficulty: level
            }
          }).then((response)=>{
          if (response.status >= 400) {
              console.log(response.status);
              throw new Error("Bad response from server");
          } else{
                return response.data;
          }
            }).then((data)=>{
                return data;
            })
    }
}


module.exports = new QuizApi();