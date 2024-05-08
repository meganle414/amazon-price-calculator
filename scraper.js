// const { spawn } = require('child_process');

// const calculate = (url) => {
//   return new Promise((resolve, reject) => {
//     const subprocess = spawn('node', ['scraper.js', url]);

//     subprocess.stdout.on('data', (data) => {
//       const result = JSON.parse(data.toString());
//       resolve(result);
//     });

//     subprocess.stderr.on('data', (data) => {
//       reject(new Error(data.toString()));
//     });

//     subprocess.on('close', (code) => {
//       if (code !== 0) {
//         reject(new Error(`Child process exited with code ${code}`));
//       }
//     });
//   });
// };

// process.stdin.on('data', async (data) => {
//   const url = data.toString().trim();
//   const result = await calculate(url);
//   process.stdout.write(JSON.stringify(result));
// });