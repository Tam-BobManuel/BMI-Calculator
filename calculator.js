
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2); 

    var result = num1 + num2;

    res.send("The answer is: " + result);
});

app.get("/bmiCalculator", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", (req, res) => {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);

  var BMI;

  function bmiCalculator(weight, height) {
      BMI = weight / (height * height);

      function interpretation() {
          if (BMI < 18.5) {
              return 'Your BMI is ' + BMI + ', so you are underweight';
          }
          if (BMI >= 18.5 && BMI <= 24.9) {
              return 'Your BMI is ' + BMI + ', so you have a normal weight.';
          }
          if (BMI > 24.9) {
              return 'Your BMI is ' + BMI + ', so you are overweight.';
          }
      }

      return interpretation();
  }

  var output = bmiCalculator(weight, height);
  var styledOutput = '<div style="text-align:center; font-weight:bold; font-family: Arial, Helvetica, sans-serif;">' + output + '</div>';
  res.send(styledOutput);
});

  
app.listen(3000, function(){
    console.log("server is running on port 3000...")
});