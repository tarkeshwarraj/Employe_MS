import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


//List of folders to create in the current backend directory
const folders = ['controllers', 'routes', 'middleware', 'models', 'services', 'config', 'utils', 'uploads'];

//List of files to create in the current backend directory
const files = ['.env', 'server.js', '.gitignore'];


//Define the base path to the backend directory
// const backendPath = path.join(__dirname, 'backend');
//const backendPath = __dirname; //In ES module syntax, __dirname is not directly avaliable

//Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create each folder inside the backend directory
folders.forEach((folder) =>{
    const dir = path.join(__dirname, folder);

    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir); //create the folder if it doesn't exist
        console.log(`Created folder: ${dir}`);
    }else{
        console.log(`Folder already exists: ${dir}`);
    }
});

files.forEach((file)=> {
    const filePath = path.join(__dirname, file);

    if(!fs.existsSync(filePath)) {
        let content = '';

        if (file === 'server.js') {
          content = `import express from 'express';\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.listen(PORT, () => {\n  console.log(\`Server is running on port \${PORT}\`);\n});\n`; // Initial server code
        } else if (file === '.env') {
          content = 'PORT=3000\n'; // Initial environment variable
        } else if (file === '.gitignore') {
          content = 'node_modules/\n.env\n'; // Common gitignore content
        }
    
        fs.writeFileSync(filePath, content); //create an empty file if it doesn't exist
        console.log(`Created file: ${filePath}`);
    }else{
        console.log(`File already exists: ${filePath}`)
    }
})

//creating files with in