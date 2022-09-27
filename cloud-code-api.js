const axios = require('axios');
const config = require('./config');
var fs = require('fs');
const inScriptParameters = require('./in-script-parameters');

const projectId = "909ac39f-4f79-425c-8950-e2939318dbae";
const environmentId = "dc764703-b131-4b2e-9877-5dec8545a3be";
const key_id = process.env.UGS_KEY_ID || config.key_id;
const secret_key = process.env.UGS_SECRET_KEY || config.secret_key;

const headers = {
  headers: {
    'Authorization': 'Basic ' + Buffer.from(`${key_id}:${secret_key}`).toString('base64')
}}

const list = async () => {
  try {
      const url = `https://services.api.unity.com/cloud-code/v1/projects/${projectId}/environments/${environmentId}/scripts`
      const res = await axios.get(url, headers);
      console.log(res.data);
  } catch (err) {
      console.error(err);
  }
};

//list();

const get = async (scriptName) => {
  try {
      const url = `https://services.api.unity.com/cloud-code/v1/projects/${projectId}/environments/${environmentId}/scripts/${scriptName}`
      const res = await axios.get(url, headers);
      console.log(res.data);
  } catch (err) {
      console.error(err);
  }
};

//get("Test");

const apiCreate = async (body) => {
  try {
      const url = `https://services.api.unity.com/cloud-code/v1/projects/${projectId}/environments/${environmentId}/scripts`
      const res = await axios.post(url, body, headers);
      console.log(res.data);
  } catch (err) {
      console.error(err);
  }
};

const createBody = {
  name: "new_from_api",
  type: "API",
  params: [
    {
      name: "string",
      type: "STRING",
      required: true
    }
  ],
  code: "",
  language: "JS"
}

//create(createBody);

const create = async (filePath, params) => {
  
  var path = process.cwd();
  var buffer = fs.readFileSync(path + "\\" + filepath);
  var fileContent = buffer.toString();
  
  try {
      const url = `https://services.api.unity.com/cloud-code/v1/projects/${projectId}/environments/${environmentId}/scripts`
      const res = await axios.post(url, body, headers);
      console.log(res.data);
  } catch (err) {
      console.error(err);
  }
};

const update = async (scriptName, body) => {
  try {
      const url = `https://services.api.unity.com/cloud-code/v1/projects/${projectId}/environments/${environmentId}/scripts/${scriptName}`
      const res = await axios.patch(url, body, headers);
      console.log(res.data);
  } catch (err) {
      console.error(err);
  }
};

const updateBody = {
  params: [
    {
      name: "string",
      type: "STRING",
      required: true
    }
  ],
  code: "const newCode = null"
}

//update("new_from_api", updateBody);

const remove = async (scriptName) => {
  try {
      const url = `https://services.api.unity.com/cloud-code/v1/projects/${projectId}/environments/${environmentId}/scripts/${scriptName}`
      const res = await axios.delete(url, headers);
      console.log(res.data);
  } catch (err) {
      console.error(err);
  }
};

//remove("new_from_api");

const publish = async (scriptName) => {
  try {
      const url = `https://services.api.unity.com/cloud-code/v1/projects/${projectId}/environments/${environmentId}/scripts/${scriptName}/publish`
      const res = await axios.post(url, {}, headers);
      console.log(res.data);
  } catch (err) {
      console.error(err);
  }
};

//publish("new_from_api");

//Convert inScriptParameters parsing output to Parameters Array for API call
function convertParamsForApi(scriptParams){
  var parametersArray = [];
  
  Object.keys(scriptParams).forEach(function(key) {
  
    //console.log("Key: " + scriptParams[key]);
    console.log("Key: " + JSON.stringify(scriptParams[key]));
    var object = {};
    var value = scriptParams[key];
    object["name"] = key;
    if (value.type)
      object["type"] = value.type;
    if (value.required)
      object["required"] = value.required;
  
    parametersArray.push(object);
  });
  return parametersArray;
}

module.exports = { list, get, create, remove, publish };