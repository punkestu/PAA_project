const {genSalt} = require("bcrypt");
const {setEnvValue} = require("./tools");

genSalt(10).then(res=>{
      setEnvValue("SALT_BCRYPT", '"'+res+'"');
});