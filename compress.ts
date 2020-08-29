import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { compress } from 'brotli';
const compressing = require('compressing');

const brotliSettings = {
    extension: 'br',
    skipLarger: true,
    mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
    quality: 11, // 0 - 11,
    lgwin: 12, // default
    threshold: 10240
};
const distFolder = "dist/angular/browser/";

function brotliCompression(input: string, output: string, settings: any) {
    const result = compress(readFileSync(input), settings);
    writeFileSync(output, result);
}

function gzipCompression(input: string, output: string) {
    return compressing.gzip.compressFile(input, output)
}

async function AllCompression(file: string, settings: any){
    brotliCompression(file, file + '.br', settings)
    await gzipCompression(file, file + '.gz')
}

function compressFolderFiles(distFolder: string) {
    readdirSync(distFolder).forEach(async (file: string) => {
        if(file.endsWith('.ico') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))
        brotliSettings.mode = 0
    
        else if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')|| file.endsWith('.svg'))
            brotliSettings.mode = 1;
    
        else if(file.endsWith('.ttf') || file.endsWith('.eot') || file.endsWith('.woff') || file.endsWith('.woff2'))
            brotliSettings.mode = 2
    
        else
            return
    
        await AllCompression(distFolder + file, brotliSettings)
    });
}

compressFolderFiles(distFolder) 
compressFolderFiles(distFolder + "assets/icons/") 
compressFolderFiles(distFolder + "assets/images/") 
compressFolderFiles(distFolder + "assets/photos/") 