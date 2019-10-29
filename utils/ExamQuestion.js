const fs = require('fs');
const util = require('util');


exports.createExamQuestions = (name) => {
    try {
        if (fs.existsSync(__dirname+'/exams/'+name)) {
           return {
               exists: true,
               created: false,
           }
        }else{
            var obj = {
                questions: []
            };
            var json = JSON.stringify(obj);

            fs.writeFileSync(__dirname+'/exams/'+name, json, 'utf8');
            return {
                exists: false,
                created: true
            }
            
        }
      } catch(err) {
        return {
            exists: false,
            created: true,
            error: err,
        }
      }
}


exports.addQuestion = async(question, name) => {
    try {
        if (fs.existsSync(__dirname+'/exams/'+name)) {
            

            const readFile = util.promisify(fs.readFile);
            try {
                const content = await readFile(__dirname+'/exams/'+name, 'utf8');
                obj = JSON.parse(content); //now it an object
                obj.questions.push(question); //add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFileSync(__dirname+'/exams/'+name, json, 'utf8'); // write it back
                return {
                    written : true,
                    error: false,
                    message: 'Question dedd to'
                }
              } catch (e) {
                return {
                    error : true,
                    message: error.message
                }
              }
            
        }else{
            return {
                found: false,
            }
        }
      } catch(err) {
        return {
            exists: false,
            found: false,
            error: err,
        }
      }
}