const linear16 = require('linear16');
 
linear16('./my_raw_test.raw', './converted_to_linear.wav')
   .then(outPath => console.log(outPath)); // Returns the output path, ex: ./output.wav 
 